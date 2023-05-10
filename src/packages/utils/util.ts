import { isString, hasOwn } from '@vue/shared';

export { isString, hasOwn };

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export declare const isArray: (arg: any) => arg is any[];