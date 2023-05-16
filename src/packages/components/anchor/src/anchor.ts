import { buildProps } from '../../../utils/props';
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';

export type AnchorContainer = HTMLElement | Window;

export const anchorProps = buildProps({
  affix: {
    type: Boolean,
    default: false
  },
  defaultAnchor: String,
  prefixCls: String,
  offsetTop: Number,
  bounds: Number,
  showInkInFixed: { type: Boolean, default: false },
  wrapperClass: String, // 容器的类名
  getContainer: {
    type: Function as PropType<() => AnchorContainer>
  },
  target: {
    type: String,
    default: ''
  },
  wrapperStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined as unknown as CSSProperties
  },
  targetOffset: Number
} as const);
export type AnchorProps = ExtractPropTypes<typeof anchorProps>;

export const anchorEmits = {
  change: () => true
};
export type AnchorEmits = typeof anchorEmits;
