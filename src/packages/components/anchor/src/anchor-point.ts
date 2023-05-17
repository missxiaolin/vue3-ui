import { buildProps } from '../../../utils/props';
import type { ExtractPropTypes } from 'vue';

export const anchorPointProps = buildProps({
  href: {
    // 锚点名称
    type: String,
    default: ''
  }
} as const);

export type AnchorPointProps = ExtractPropTypes<typeof anchorPointProps>;

export const anchorPointEmits = {
  // click: () => true
};
export type AnchorPointEmits = typeof anchorPointEmits;
