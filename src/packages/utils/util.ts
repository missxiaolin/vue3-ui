import isServer from './isServer';

import { isString, hasOwn, isArray, camelize, isObject } from '@vue/shared';

export { isString, hasOwn, isArray, camelize, isObject };

export { isBoolean } from '@vueuse/core';

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export function isUndefined(val: any): val is undefined {
  return val === undefined;
}

export const SCOPE = 'Util';

// reexport from lodash & vue shared
export { isVNode } from 'vue';

/**
 * @param value
 * @returns
 */
export function addUnit(value: string | number) {
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}px`;
  }
  console.warn(SCOPE, 'binding value must be a string or number');
  return '';
}
// coerce truthy value to array
export const coerceTruthyValueToArray = (arr: number) => {
  if (!arr && arr !== 0) {
    return [];
  }
  return Array.isArray(arr) ? arr : [arr];
};

/**
 * @param num
 * @param digit
 * @returns
 */
export function myFixed(num: any, digit: number = 2) {
  if (Object.is(parseFloat(num), NaN)) {
    return console.log(`传入的值：${num}不是一个数字`);
  }
  num = parseFloat(num);
  return (Math.round((num + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit);
}

/**
 * Generate random number in range [0, 1000]
 * Maybe replace with [uuid](https://www.npmjs.com/package/uuid)
 */
export const generateId = (): number => Math.floor(Math.random() * 10000);

// drop IE and (Edge < 79) support
// export const isIE
// export const isEdge

export const isFirefox = function (): boolean {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i);
};