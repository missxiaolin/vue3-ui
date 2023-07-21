class MentionMenuEvents {
  [x: string]: any;
  constructor(mention: any) {
    this.mention = mention;
    this.mention.menuEvents = this;
    this.menu = this.mention.menu;
  }

  bind(menu: any) {
    this.menuClickEvent = this.mention.events.click.bind(null, this);
    this.menuContainerScrollEvent = this.debounce(
      () => {
        if (this.mention.isActive) {
          this.mention.showMenuFor(this.mention.current.element, false);
        }
      },
      300,
      false
    );
    this.windowResizeEvent = this.debounce(
      () => {
        if (this.mention.isActive) {
          this.mention.range.positionMenuAtCaret(true);
        }
      },
      300,
      false
    );

    // fixes IE11 issues with mousedown
    this.mention.range.getDocument().addEventListener('MSPointerDown', this.menuClickEvent, false);
    this.mention.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
    window.addEventListener('resize', this.windowResizeEvent);

    if (this.menuContainer) {
      this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
    } else {
      window.addEventListener('scroll', this.menuContainerScrollEvent);
    }
  }

  unbind(menu: any) {
    this.mention.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
    this.mention.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
    window.removeEventListener('resize', this.windowResizeEvent);

    if (this.menuContainer) {
      this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
    } else {
      window.removeEventListener('scroll', this.menuContainerScrollEvent);
    }
  }

  debounce(func: { (): void; (): void; apply?: any }, wait: number | undefined, immediate: boolean) {
    var timeout: number | null | undefined;
    return () => {
      var context = this,
        args = arguments;
      var later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

export default MentionMenuEvents;
