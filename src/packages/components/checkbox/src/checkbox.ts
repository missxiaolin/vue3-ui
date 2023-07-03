import type { ComputedRef } from 'vue';
export type AnyFunction<T> = (...args: any[]) => T;
export const checkboxSize = ['medium', 'small', 'mini'] as const;
export const checkboxProps = {
  modelValue: {
    type: [Boolean, Number, String],
    default: () => undefined
  },
  name: {
    type: String,
    default: undefined
  },
  label: {
    type: [String, Boolean, Number, Object]
  },
  trueLabel: {
    type: [String, Number],
    default: undefined
  },
  falseLabel: {
    type: [String, Number],
    default: undefined
  },
  size: {
    type: String,
    values: checkboxSize
  },
  tabindex: [String, Number],
  border: Boolean,
  disabled: Boolean,
  indeterminate: Boolean
};
