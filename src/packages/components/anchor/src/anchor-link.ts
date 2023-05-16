import { buildProps } from '../../../utils/props';
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';

export type AnchorContainer = HTMLElement | Window;

export const anchorLinkProps = buildProps({
  href: {
    // 锚点链接
    type: String,
    default: ''
  },
  title: {
    // 文字内容
    type: String
  },
  target: {
    // 该属性指定在何处显示链接的资源。
    type: String
  }
} as const);

export type AnchorLinkProps = ExtractPropTypes<typeof anchorLinkProps>;

export const anchorLinkEmits = {
  // click: () => true
};
export type AnchorLinkEmits = typeof anchorLinkEmits;
