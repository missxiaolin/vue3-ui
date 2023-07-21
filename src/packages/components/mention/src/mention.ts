import { isString, isObject } from '@vue/shared';
import { buildProps, definePropType, iconPropType } from '../../../utils/props';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { useSizeProp } from '../../../hooks';
import type { ExtractPropTypes } from 'vue';

export const mentionProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: ''
  },
  type: {
    type: String,
    default: 'input'
  },
  placeholder: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  follower: {
    type: Boolean,
    default: false
  },
  to: {
    type: Boolean,
    default: true
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  suffixIcon: {
    type: iconPropType,
    default: ''
  },
  members: {
    type: [Array, Function]
  },
  tag: {
    type: String,
    default: 'div'
  },
  containerClass: {
    type: String
  },
  key: {
    type: String,
    default: 'userName'
  },
  value: {
    type: String,
    default: 'userCode'
  },
  post: {
    type: String,
    default: 'post'
  }
} as const);
export type InputProps = ExtractPropTypes<typeof mentionProps>;

export const mentionEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  'update:text': (value: string) => isString(value),
  'update:mention': (value: object) => isObject(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent
};
export type InputEmits = typeof mentionEmits;
