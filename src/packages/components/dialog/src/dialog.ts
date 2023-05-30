import { isValidWidthUnit } from '../../../utils/validators';
import { buildProps, definePropType } from '../../../utils/props';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';

import type { ExtractPropTypes } from 'vue';

export const DialogProps = buildProps({
  appendToBody: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: definePropType<(...args: any[]) => void>(Function)
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String,
    default: '15vh'
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  modalClass: String,
  width: {
    type: [String, Number],
    validator: isValidWidthUnit
  },
  zIndex: {
    type: Number
  },
  size: {
    type: String,
    default: ''
  }
} as const);

export type DialogProps = ExtractPropTypes<typeof DialogProps>;

export const DialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => typeof value === 'boolean'
};
export type DialogEmits = typeof DialogEmits;
