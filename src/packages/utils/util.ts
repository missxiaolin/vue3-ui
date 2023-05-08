import { isString } from '@vue/shared';

export { isString };

export const isNumber = (val: unknown): val is number => typeof val === 'number';
