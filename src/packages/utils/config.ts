import type { ComponentSize } from './types';

export interface InstallOptions {
  size: ComponentSize;
  zIndex: number;
  locale?: any;
}

let $UI = {} as InstallOptions;

const setConfig = (option: InstallOptions): void => {
  $UI = option;
};

const getConfig = (key: keyof InstallOptions): unknown => {
  return $UI[key];
};

export { getConfig, setConfig };
