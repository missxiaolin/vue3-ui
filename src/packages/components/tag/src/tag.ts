import type { ExtractPropTypes } from 'vue';

export const TAG_TYPE: string[] = ['success', 'info', 'warning', 'danger'];
export const SIZE_TYPE: string[] = ['medium', 'small', 'mini'];
export const EFFECT_TYPE: string[] = ['light', 'fill', 'plain'];

export const tagProps = {
  type: {
    // 类型
    type: String,
    value: [...TAG_TYPE, ''],
    default: ''
  },
  closable: {
    // 是否可关闭
    type: Boolean,
    default: false
  },
  hit: {
    // 是否显示边框
    type: Boolean,
    default: false
  },
  color: {
    // 背景色
    type: String,
    default: ''
  },
  size: {
    // 尺寸大小
    type: String,
    value: [...SIZE_TYPE, ''],
    default: ''
  },
  effect: {
    // 主题
    type: String,
    value: EFFECT_TYPE,
    default: 'light'
  },
  disableTransitions: Boolean
};

export const tagEmits = {
  close: () => true,
  click: () => true
};

export type TagProps = ExtractPropTypes<typeof tagProps>;
