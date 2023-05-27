import { NOOP } from '@vue/shared';
import type { SFCWithInstall } from './types';

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app) => {
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCWithInstall<T>;
};

/**
 * @param component 
 * @returns 
 */
export const withNoopInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = NOOP;

  return component as SFCWithInstall<T>;
};
