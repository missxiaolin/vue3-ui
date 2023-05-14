import { isString, hasOwn, isArray, camelize } from '@vue/shared';

export { isString, hasOwn, isArray, camelize };

export const isNumber = (val: unknown): val is number => typeof val === 'number';
