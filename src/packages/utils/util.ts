import { isString, hasOwn, isArray } from '@vue/shared';

export { isString, hasOwn, isArray };

export const isNumber = (val: unknown): val is number => typeof val === 'number';
