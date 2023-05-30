import isServer from './isServer';
import type { Nullable } from './types';
import { camelize } from './util';

/* istanbul ignore next */
const trimArr = function (s: string) {
  return (s || '').split(' ').filter((item) => !!item.trim());
};

/* istanbul ignore next */
export const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture);
  }
};

/* istanbul ignore next */
export const off = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element?.removeEventListener(event, handler, useCapture);
  }
};

/* istanbul ignore next */
export function hasClass(el: HTMLElement | Element, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    const className = el.getAttribute('class') || '';
    return className.split(' ').includes(cls);
  }
}

/**
 * @param el
 * @param isVertical
 * @returns
 */
export const isScroll = (el: HTMLElement, isVertical?: Nullable<boolean>): RegExpMatchArray | null => {
  if (isServer) return null;
  const determinedDirection = isVertical === null || isVertical === undefined;
  const overflow = determinedDirection
    ? getStyle(el, 'overflow')
    : isVertical
    ? getStyle(el, 'overflow-y')
    : getStyle(el, 'overflow-x');

  return overflow.match(/(scroll|auto|overlay)/);
};

/**
 * @param el
 * @param isVertical
 * @returns
 */
export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: Nullable<boolean>
): Window | HTMLElement | undefined => {
  if (isServer) return;
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, isVertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
};

/* istanbul ignore next */
// Here I want to use the type CSSProperties, but the definition for CSSProperties
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = function (element: HTMLElement, styleName: any): string {
  if (isServer) return '';
  if (!element || !styleName) return '';
  styleName = camelize(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const style = element.style[styleName];
    if (style) return style;
    const computed = document.defaultView?.getComputedStyle(element, '');
    return computed ? computed[styleName] : '';
  } catch (e) {
    return element.style[styleName];
  }
};

export const win = window;

export const docu = document;

export const body = docu.body;

let count = 0;

const CLSNAME = 'l-overflow-hidden';

export const useLockScroll = (isLock: () => boolean) => {
  const lock = () => {
    if (isLock()) {
      try {
        !count && body.classList.add(CLSNAME);
        count++;
      } catch (error) {}
    }
  };

  const unlock = () => {
    if (isLock() && count) {
      try {
        count--;
        !count && body.classList.remove(CLSNAME);
      } catch (error) {}
    }
  };

  return [lock, unlock];
};

/* istanbul ignore next */
export function addClass(el: HTMLElement | Element, cls: string): void {
  if (!el) return;
  let className = el.getAttribute('class') || '';
  const curClass = trimArr(className);
  const classes = (cls || '').split(' ').filter((item) => !curClass.includes(item) && !!item.trim());

  if (el.classList) {
    el.classList.add(...classes);
  } else {
    className += ` ${classes.join(' ')}`;
    el.setAttribute('class', className);
  }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement | Element, cls: string): void {
  if (!el || !cls) return;
  const classes = trimArr(cls);
  let curClass = el.getAttribute('class') || '';

  if (el.classList) {
    el.classList.remove(...classes);
    return;
  }
  classes.forEach((item) => {
    curClass = curClass.replace(` ${item} `, ' ');
  });
  const className = trimArr(curClass).join(' ');
  el.setAttribute('class', className);
}

/**
 * @param theirsHandler
 * @param oursHandler
 * @param param2
 * @returns
 */
export const composeEventHandlers = <E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event);

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event);
    }
  };
  return handleEvent;
};


type WhenMouseHandler = (e: PointerEvent) => any;
export const whenMouse = (handler: WhenMouseHandler): WhenMouseHandler => {
  return (e: PointerEvent) => (e.pointerType === 'mouse' ? handler(e) : undefined);
};