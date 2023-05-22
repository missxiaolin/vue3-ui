import { isString, hasOwn, isArray, camelize, isObject } from '@vue/shared';

export { isString, hasOwn, isArray, camelize, isObject };

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const SCOPE = 'Util';

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
