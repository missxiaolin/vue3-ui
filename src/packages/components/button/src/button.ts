import { PropType, ExtractPropTypes } from 'vue';
import { useSizeProp } from '../../../hooks';
export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text', 'gary', ''] as const;
export type buttonNativeType = 'button' | 'submit' | 'reset';

export const buttonProps = {
  iconPosition: {
    type: String,
    default: 'right',
    validator(value: string) {
      return value === 'left' || value === 'right';
    }
  },
  nativeType: {
    type: String as PropType<buttonNativeType>,
    default: 'button'
  },
  plain: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    values: buttonTypes,
    default: 'default'
  },
  size: useSizeProp,
  icon: {
    type: String,
    default: ''
  },
  // 防爆点击时间
  clickTime: {
    type: Number,
    default: 500
  },
  name: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean
};
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export interface ButtonConfigContext {
  autoInsertSpace?: boolean;
}
