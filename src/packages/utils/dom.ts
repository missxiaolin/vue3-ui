import isServer from './isServer';
import type { Nullable } from './types';
import { camelize } from './util';

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