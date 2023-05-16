import { isString, hasOwn, isArray, camelize, isObject } from '@vue/shared';

export { isString, hasOwn, isArray, camelize, isObject };

export const isNumber = (val: unknown): val is number => typeof val === 'number';
