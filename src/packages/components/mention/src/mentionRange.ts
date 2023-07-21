// Thanks to https://github.com/jeff-collins/ment.io
import './utils';

class MentionRange {
  [x: string]: any;
  constructor(mention: any) {
    this.mention = mention;
    this.mention.range = this;
  }

  getDocument() {
    let iframe;
    if (this.mention.current.collection) {
      iframe = this.mention.current.collection.iframe;
    }

    if (!iframe) {
      return document;
    }

    return iframe.contentWindow.document;
  }

  positionMenuAtCaret(scrollTo: any) {
    let context = this.mention.current,
      coordinates: { top: any; left: any; right?: any; bottom?: any };
    let info = this.getTriggerInfo(
      false,
      this.mention.hasTrailingSpace,
      true,
      this.mention.allowSpaces,
      this.mention.autocompleteMode
    );

    if (typeof info !== 'undefined') {
      if (!this.mention.positionMenu) {
        this.mention.menu.style.cssText = `display: block;`;
        return;
      }
      if (!this.isContentEditable(context.element)) {
        coordinates = this.getTextAreaOrInputUnderlinePosition(this.mention.current.element, info.mentionPosition);
      } else {
        coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
      }
      console.log('coordinates----', coordinates);
      coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
      this.mention.menu.style.cssText = `
                                    opacity: 1;
                                    top: ${coordinates.top}px;
                                    left: ${coordinates.left}px;
                                    right: ${coordinates.right}px;
                                    bottom: ${coordinates.bottom}px;
                                    position: absolute;`;

      if (coordinates.left === 'auto') {
        this.mention.menu.style.left = 'auto';
      }

      if (coordinates.top === 'auto') {
        this.mention.menu.style.top = 'auto';
      }

      if (scrollTo) this.scrollIntoView();
      // this.scrollIntoView();
      window.setTimeout(() => {
        let menuDimensions = {
          width: this.mention.menu.offsetWidth,
          height: this.mention.menu.offsetHeight
        };
        let menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

        let menuIsOffScreenHorizontally =
          window.innerWidth > menuDimensions.width && (menuIsOffScreen.left || menuIsOffScreen.right);
        let menuIsOffScreenVertically =
          window.innerHeight > menuDimensions.height && (menuIsOffScreen.top || menuIsOffScreen.bottom);
        if (menuIsOffScreenHorizontally || menuIsOffScreenVertically) {
          // this.mention.menu.style.cssText = "display: none";
          // this.positionMenuAtCaret(scrollTo);
        }
      }, 0);
    } else {
      this.mention.menu.style.cssText = 'display: none';
    }
  }

  get menuContainerIsBody() {
    return this.mention.menuContainer === document.body || !this.mention.menuContainer;
  }

  selectElement(targetElement: { focus: () => void }, path: string | any[], offset: number) {
    let range;
    let elem = targetElement;

    if (path) {
      for (var i = 0; i < path.length; i++) {
        elem = elem.childNodes[path[i]];
        if (elem === undefined) {
          return;
        }
        while (elem.length < offset) {
          offset -= elem.length;
          elem = elem.nextSibling;
        }
        if (elem.childNodes.length === 0 && !elem.length) {
          elem = elem.previousSibling;
        }
      }
    }
    let sel = this.getWindowSelection();

    range = this.getDocument().createRange();
    range.setStart(elem, offset);
    range.setEnd(elem, offset);
    range.collapse(true);

    try {
      sel.removeAllRanges();
    } catch (error) {}
    sel.addRange(range);
    targetElement.focus();
  }

  replaceTriggerText(
    text: string | any[],
    requireLeadingSpace: any,
    hasTrailingSpace: any,
    originalEvent: any,
    item: any,
    customSelection: any
  ) {
    let info = this.getTriggerInfo(
      true,
      hasTrailingSpace,
      requireLeadingSpace,
      this.mention.allowSpaces,
      this.mention.autocompleteMode,
      customSelection
    );
    if (info !== undefined) {
      let context = this.mention.current;
      let replaceEvent = new CustomEvent('mention-replaced', {
        detail: {
          item: item,
          instance: context,
          context: info,
          event: originalEvent
        }
      });

      if (!this.isContentEditable(context.element)) {
        let myField = this.mention.current.element;
        let textSuffix = typeof this.mention.replaceTextSuffix == 'string' ? this.mention.replaceTextSuffix : ' ';
        text += textSuffix;
        let startPos = info.mentionPosition;
        let endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
        if (!this.mention.autocompleteMode) {
          endPos += info.mentionTriggerChar.length - 1;
        }
        myField.value =
          myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + text.length;
        myField.selectionEnd = startPos + text.length;
      } else {
        // add a space to the end of the pasted text
        let textSuffix = typeof this.mention.replaceTextSuffix == 'string' ? this.mention.replaceTextSuffix : '\xA0';
        text += textSuffix;
        let endPos = info.mentionPosition + info.mentionText.length;
        if (!this.mention.autocompleteMode) {
          endPos += info.mentionTriggerChar.length;
        }
        this.pasteHtml(text, info.mentionPosition, endPos, customSelection);
      }

      context.element.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      context.element.dispatchEvent(replaceEvent);
    }
  }

  pasteHtml(html: any, startPos: number, endPos: any, customSelection: any) {
    let range, sel;
    sel = this.getWindowSelection();
    range = this.getDocument().createRange();
    range.setStart(customSelection ? this.mention.anchorNode.text : sel.anchorNode, startPos);
    range.setEnd(customSelection ? this.mention.anchorNode.text : sel.anchorNode, endPos);
    range.deleteContents();

    let el = this.getDocument().createElement('div');
    el.innerHTML = html;
    let frag = this.getDocument().createDocumentFragment(),
      node,
      lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    // Preserve the selection
    if (lastNode) {
      range = range.cloneRange();
      range.setStartAfter(lastNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  getWindowSelection() {
    if (this.mention.collection.iframe) {
      return this.mention.collection.iframe.contentWindow.getSelection();
    }

    return window.getSelection();
  }

  getNodePositionInParent(element: { parentNode: { childNodes: string | any[] } | null }) {
    if (element.parentNode === null) {
      return 0;
    }

    for (var i = 0; i < element.parentNode.childNodes.length; i++) {
      let node = element.parentNode.childNodes[i];

      if (node === element) {
        return i;
      }
    }
  }

  getContentEditableSelectedPath(ctx: any, customSelection: any) {
    let sel = this.getWindowSelection();
    let selected = customSelection ? this.mention.anchorNode.text : sel.anchorNode;
    let path = [];
    let offset;

    if (selected != null) {
      let i;
      let ce = selected.contentEditable;
      while (selected !== null && ce !== 'true') {
        i = this.getNodePositionInParent(selected);
        path.push(i);
        selected = selected.parentNode;
        if (selected !== null) {
          ce = selected.contentEditable;
        }
      }
      path.reverse();

      // getRangeAt may not exist, need alternative
      offset = customSelection ? this.mention.anchorNode.offset : sel.getRangeAt(0).startOffset;

      return {
        selected: selected,
        path: path,
        offset: offset
      };
    }
  }

  getTextPrecedingCurrentSelection(customSelection: any) {
    let context = this.mention.current,
      text = '';
    if (!this.isContentEditable(context.element)) {
      let textComponent = this.mention.current.element;
      if (textComponent) {
        let startPos = textComponent.selectionStart;
        if (textComponent.value && startPos >= 0) {
          text = textComponent.value.substring(0, startPos);
        }
      }
    } else {
      let selectedElem = customSelection ? this.mention.anchorNode.text : this.getWindowSelection().anchorNode;
      let selectStartOffset = customSelection
        ? this.mention.anchorNode.offset
        : this.getWindowSelection().getRangeAt(0).startOffset;
      // if (selectedElem != this.mention.current.element) {
      //   text = "//";
      // } else
      if (selectedElem != null) {
        let workingNodeContent = selectedElem.textContent;

        if (workingNodeContent && selectStartOffset >= 0) {
          text = workingNodeContent.substring(0, selectStartOffset);
        }
      }
    }
    return text;
  }

  getLastWordInText(text: string) {
    var wordsArray;
    if (this.mention.autocompleteSeparator) {
      wordsArray = text.split(this.mention.autocompleteSeparator);
    } else {
      wordsArray = text.split(/\s+/);
    }
    var wordsCount = wordsArray.length - 1;
    return wordsArray[wordsCount];
  }

  getTriggerInfo(
    menuAlreadyActive: boolean,
    hasTrailingSpace: any,
    requireLeadingSpace: boolean,
    allowSpaces: any,
    isAutocomplete: any,
    customSelection: undefined
  ) {
    let ctx = this.mention.current;
    let selected, path, offset;

    if (!this.isContentEditable(ctx.element)) {
      selected = this.mention.current.element;
    } else {
      let selectionInfo = this.getContentEditableSelectedPath(ctx, customSelection);

      if (selectionInfo) {
        selected = selectionInfo.selected;
        path = selectionInfo.path;
        offset = selectionInfo.offset;
      }
    }

    let effectiveRange = this.getTextPrecedingCurrentSelection(customSelection);
    let lastWordOfEffectiveRange = this.getLastWordInText(effectiveRange);
    if (isAutocomplete) {
      return {
        mentionPosition: effectiveRange.length - lastWordOfEffectiveRange.length,
        mentionText: lastWordOfEffectiveRange,
        mentionSelectedElement: selected,
        mentionSelectedPath: path,
        mentionSelectedOffset: offset
      };
    }
    if (effectiveRange !== undefined && effectiveRange !== null) {
      let mostRecentTriggerCharPos = -1;
      let triggerChar;

      this.mention.collection.forEach((config: { trigger: any; requireLeadingSpace: any }) => {
        let c = config.trigger;
        let idx = config.requireLeadingSpace
          ? this.lastIndexWithLeadingSpace(effectiveRange, c)
          : effectiveRange.lastIndexOf(c);
        if (idx > mostRecentTriggerCharPos) {
          mostRecentTriggerCharPos = idx;
          triggerChar = c;
          requireLeadingSpace = config.requireLeadingSpace;
        }
      });
      if (
        mostRecentTriggerCharPos >= 0 &&
        (mostRecentTriggerCharPos === 0 ||
          !requireLeadingSpace ||
          /\s/.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)) ||
          escape(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)).indexOf('%u') >= 0)
      ) {
        let currentTriggerSnippet = effectiveRange.substring(
          mostRecentTriggerCharPos + triggerChar.length,
          effectiveRange.length
        );

        triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + triggerChar.length);
        let firstSnippetChar = currentTriggerSnippet.substring(0, 1);
        let leadingSpace =
          currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
        if (hasTrailingSpace) {
          currentTriggerSnippet = currentTriggerSnippet.trim();
        }

        let regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

        this.mention.hasTrailingSpace = regex.test(currentTriggerSnippet);

        if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
          return {
            mentionPosition: mostRecentTriggerCharPos,
            mentionText: currentTriggerSnippet,
            mentionSelectedElement: selected,
            mentionSelectedPath: path,
            mentionSelectedOffset: offset,
            mentionTriggerChar: triggerChar
          };
        }
      }
    }
  }

  lastIndexWithLeadingSpace(str: string, trigger: string | any[]) {
    let reversedStr = str.split('').reverse().join('');
    let index = -1;

    for (let cidx = 0, len = str.length; cidx < len; cidx++) {
      let firstChar = cidx === str.length - 1;
      let leadingSpace = /\s/.test(reversedStr[cidx + 1]);
      let china = escape(reversedStr[cidx + 1]).indexOf('%u') >= 0;

      let match = true;
      for (let triggerIdx = trigger.length - 1; triggerIdx >= 0; triggerIdx--) {
        if (trigger[triggerIdx] !== reversedStr[cidx - triggerIdx]) {
          match = false;
          break;
        }
      }
      if (match && (firstChar || leadingSpace || china)) {
        index = str.length - 1 - cidx;
        break;
      }
    }

    return index;
  }

  isContentEditable(element: { nodeName: string }) {
    return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
  }

  isMenuOffScreen(
    coordinates: { top: any; left: any; bottom?: any; right?: any },
    menuDimensions: { width: any; height: any }
  ) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let doc = document.documentElement;
    if (!this.menuContainerIsBody) {
      doc = this.mention.menuContainer;
    }
    let windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    let windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    let menuTop =
      typeof coordinates.top === 'number'
        ? coordinates.top
        : windowTop + windowHeight - coordinates.bottom - menuDimensions.height;
    let menuRight = typeof coordinates.right === 'number' ? coordinates.right : coordinates.left + menuDimensions.width;
    let menuBottom =
      typeof coordinates.bottom === 'number' ? coordinates.bottom : coordinates.top + menuDimensions.height;
    let menuLeft =
      typeof coordinates.left === 'number'
        ? coordinates.left
        : windowLeft + windowWidth - coordinates.right - menuDimensions.width;

    return {
      top: menuTop < Math.floor(windowTop),
      right: menuRight > Math.ceil(windowLeft + windowWidth),
      bottom: menuBottom > Math.ceil(windowTop + windowHeight),
      left: menuLeft < Math.floor(windowLeft)
    };
  }

  getMenuDimensions() {
    // Width of the menu depends of its contents and position
    // We must check what its width would be without any obstruction
    // This way, we can achieve good positioning for flipping the menu
    let dimensions = {
      width: null,
      height: null
    };

    this.mention.menu.style.cssText = `top: 0px;
                                 left: 0px;
                                 position: fixed;
                                 display: block;
                                 visibility; hidden;`;
    dimensions.width = this.mention.menu.offsetWidth;
    dimensions.height = this.mention.menu.offsetHeight;

    this.mention.menu.style.cssText = `display: none;`;

    return dimensions;
  }

  getTextAreaOrInputUnderlinePosition(element: Element, position: number, flipped: undefined) {
    let properties = [
      'direction',
      'boxSizing',
      'width',
      'height',
      'overflowX',
      'overflowY',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'fontSizeAdjust',
      'lineHeight',
      'fontFamily',
      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',
      'letterSpacing',
      'wordSpacing'
    ];

    let isFirefox = window.mozInnerScreenX !== null;

    let div = this.getDocument().createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    this.getDocument().body.appendChild(div);

    let style = div.style;
    let computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT') {
      style.wordWrap = 'break-word';
    }

    // position off-screen
    style.position = 'absolute';
    style.visibility = 'hidden';

    // transfer the element's properties to the div
    properties.forEach((prop) => {
      style[prop] = computed[prop];
    });

    if (isFirefox) {
      style.width = `${parseInt(computed.width) - 2}px`;
      if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
    } else {
      style.overflow = 'hidden';
    }

    div.textContent = element.value.substring(0, position);

    if (element.nodeName === 'INPUT') {
      div.textContent = div.textContent.replace(/\s/g, ' ');
    }

    let span = this.getDocument().createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);

    let rect = element.getBoundingClientRect();
    let doc = document.documentElement;
    let windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    let windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    let top = 0;
    let left = 0;
    if (this.menuContainerIsBody) {
      top = rect.top;
      left = rect.left;
    }

    let coordinates = {
      top:
        top +
        windowTop +
        span.offsetTop +
        parseInt(computed.borderTopWidth) +
        parseInt(computed.fontSize) -
        element.scrollTop,
      left: left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
    };

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let menuDimensions = this.getMenuDimensions();
    let menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

    if (menuIsOffScreen.right) {
      coordinates.right = windowWidth - coordinates.left;
      coordinates.left = 'auto';
    }

    let parentHeight = this.mention.menuContainer
      ? this.mention.menuContainer.offsetHeight
      : this.getDocument().body.offsetHeight;

    if (menuIsOffScreen.bottom) {
      let parentRect = this.mention.menuContainer
        ? this.mention.menuContainer.getBoundingClientRect()
        : this.getDocument().body.getBoundingClientRect();
      let scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

      coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
      coordinates.top = 'auto';
    }

    menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
    if (menuIsOffScreen.left) {
      coordinates.left =
        windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
      delete coordinates.right;
    }
    if (menuIsOffScreen.top) {
      coordinates.top =
        windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
      delete coordinates.bottom;
    }

    this.getDocument().body.removeChild(div);
    return coordinates;
  }

  getContentEditableCaretPosition(selectedNodePosition: number) {
    let range;
    let sel = this.getWindowSelection();

    range = this.getDocument().createRange();
    range.setStart(sel.anchorNode, selectedNodePosition);
    range.setEnd(sel.anchorNode, selectedNodePosition);

    range.collapse(false);

    let rect = range.getBoundingClientRect();
    let doc = document.documentElement;
    if (!this.menuContainerIsBody) {
      doc = this.mention.menuContainer;
    }
    let windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    let windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    let left = rect.left;
    let top = rect.top;
    let coordinates = {
      left: left + windowLeft,
      top: top + rect.height + windowTop
    };
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let menuDimensions = this.getMenuDimensions();
    let menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

    if (menuIsOffScreen.right) {
      coordinates.left = 'auto';
      coordinates.right = windowWidth - rect.left - windowLeft;
    }

    let parentHeight = this.mention.menuContainer
      ? this.mention.menuContainer.offsetHeight
      : this.getDocument().body.offsetHeight;

    if (menuIsOffScreen.bottom) {
      let parentRect = this.mention.menuContainer
        ? this.mention.menuContainer.getBoundingClientRect()
        : this.getDocument().body.getBoundingClientRect();
      let scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

      coordinates.top = 'auto';
      coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
      if (!this.menuContainerIsBody) {
        coordinates.bottom -= this.mention.menuContainer.scrollTop;
      }
    }

    menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
    if (menuIsOffScreen.left) {
      coordinates.left =
        windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
      delete coordinates.right;
    }
    if (menuIsOffScreen.top) {
      coordinates.top =
        windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
      delete coordinates.bottom;
    }
    if (!this.menuContainerIsBody) {
      coordinates.left = coordinates.left ? coordinates.left - this.mention.menuContainer.offsetLeft : coordinates.left;
      coordinates.top =
        typeof coordinates.top === 'string'
          ? coordinates.top
          : coordinates.top
          ? coordinates.top - this.mention.menuContainer.offsetTop
          : coordinates.top;
    }
    return coordinates;
  }

  scrollIntoView(elem: undefined) {
    let reasonableBuffer = 20,
      clientRect;
    let maxScrollDisplacement = 100;
    let e = this.menu;

    if (typeof e === 'undefined') return;

    while (clientRect === undefined || clientRect.height === 0) {
      clientRect = e.getBoundingClientRect();

      if (clientRect.height === 0) {
        e = e.childNodes[0];
        if (e === undefined || !e.getBoundingClientRect) {
          return;
        }
      }
    }

    let elemTop = clientRect.top;
    let elemBottom = elemTop + clientRect.height;

    if (elemTop < 0) {
      window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
    } else if (elemBottom > window.innerHeight) {
      let maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

      if (maxY - window.pageYOffset > maxScrollDisplacement) {
        maxY = window.pageYOffset + maxScrollDisplacement;
      }

      let targetY = window.pageYOffset - (window.innerHeight - elemBottom);

      if (targetY > maxY) {
        targetY = maxY;
      }

      window.scrollTo(0, targetY);
    }
  }
}

export default MentionRange;
