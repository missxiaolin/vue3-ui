import type { PropType } from 'vue';
export type ComponentSize = '' | 'default' | 'large' | 'medium' | 'small' | 'mini';
export const groupCheckboxProps = {
  modelValue: {
    type: [Object, Boolean, Array],
    default: () => undefined
  },
  border: Boolean,
  disabled: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: (val: string) => ['', 'default', 'large', 'medium', 'small', 'mini'].includes(val)
  }
};
