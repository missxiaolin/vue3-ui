export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft', // 37
  up: 'ArrowUp', // 38
  right: 'ArrowRight', // 39
  down: 'ArrowDown', // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace'
};

const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;

/**
 * Determine if the testing element is visible on screen no matter if its on the viewport or not
 */
export const isVisible = (element: HTMLElement) => {
  const computed = getComputedStyle(element);
  // element.offsetParent won't work on fix positioned
  // WARNING: potential issue here, going to need some expert advices on this issue
  return computed.position === 'fixed' ? false : element.offsetParent !== null;
};

export const obtainAllFocusableElements = (element: HTMLElement): HTMLElement[] => {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_SELECTORS)).filter(
    (item: HTMLElement) => isFocusable(item) && isVisible(item)
  );
};

/**
 * @desc Determine if target element is focusable
 * @param element {HTMLElement}
 * @returns {Boolean} true if it is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true;
  }
  // HTMLButtonElement has disabled
  if ((element as HTMLButtonElement).disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A': {
      // casting current element to Specific HTMLElement in order to be more type precise
      return !!(element as HTMLAnchorElement).href && (element as HTMLAnchorElement).rel !== 'ignore';
    }
    case 'INPUT': {
      return !((element as HTMLInputElement).type === 'hidden' || (element as HTMLInputElement).type === 'file');
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true;
    }
    default: {
      return false;
    }
  }
};