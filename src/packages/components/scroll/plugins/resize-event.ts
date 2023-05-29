import { ElementObj } from '.';
import isServer from '../../../utils/isServer';

export function resizeHandler(mutationsList: MutationRecord[], observer: any, element: ElementObj): void {
  const listeners = element.resizeListners || [];
  if (listeners.length) {
    listeners.forEach((fn: Function) => fn());
  }
}

export const addResizeListener = (element: ElementObj, fn: Function): void => {
  if (isServer) return;
  if (!element.resizeListners) {
    element.resizeListners = [];
    window.addEventListener('resize', fn());
    const mutationObserverSupported = typeof MutationObserver !== 'undefined';
    if (mutationObserverSupported) {
      element.observer = new MutationObserver((mutationsList, observer) =>
        resizeHandler(mutationsList, observer, element)
      );
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      };

      element.observer.observe(element as Node, config);
    }
  }
  element.resizeListners.push(fn);
};

export const removeResizeListener = (element: ElementObj, fn: Function): void => {
  if (!element || !element.resizeListners) return;
  element.resizeListners.splice(element.resizeListners.indexOf(fn), 1);
  if (!element.resizeListners.length) {
    element.observer.disconnect();
  }
};
