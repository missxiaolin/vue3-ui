import { isValidWidthUnit } from '../../../utils/validators';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';

import type { PropType } from 'vue';
import type { ExtractPropTypes } from 'vue';

const wrapperKey = Symbol();
export type PropWrapper<T> = { [wrapperKey]: T };
export const definePropType = <T>(val: any) => ({ [wrapperKey]: val } as PropWrapper<T>);

type DrawerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';

export enum PD {
  ltr = 'left',
  rtl = 'right',
  ttb = 'top',
  btt = 'bottom'
}

export const dialogProps = {
  appendToBody: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    // type: definePropType<(...args: any[]) => void>(Function),
    type: Function
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
  // TODO: 待完善
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  // TODO: 待完善
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
  // TODO: 待完善
  openDelay: {
    type: Number,
    default: 0
  },
  // TODO: 待完善
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
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
  }
};

export const drawerProps = {
  ...dialogProps,
  direction: {
    type: String as PropType<DrawerDirection>,
    default: 'rtl',
    validator: (val: DrawerDirection) => {
      return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1;
    }
  },
  size: {
    type: [String, Number],
    default: '30%'
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  modalFade: {
    type: Boolean,
    default: true
  },
  // 出现位置的偏移量
  offset: {
    type: [String, Number],
    default: 0
  }
};

export type DialogProps = ExtractPropTypes<typeof dialogProps>;

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => typeof value === 'boolean'
};

export type DialogEmits = typeof dialogEmits;
