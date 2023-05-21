import { CSSProperties, PropType } from 'vue';
import { buildProps } from '../../../utils/props';
import { CLICK_EVENT } from '../../../constants/event';
import { isNumber } from '../../../utils/util';

export const OverlayProps = buildProps({
  visible: { // 是否显示
    type: Boolean,
    default: false
  },
  zIndex: { // 自定义遮罩层级
    type: [Number, String],
    default: 2000
  },
  duration: { // 显示/隐藏的动画时长，单位秒
    type: [Number, String],
    default: 0.3
  },
  lockScroll: { // 遮罩显示时的背景是否锁定
    type: Boolean,
    default: true
  },
  overlayClass: { // 自定义遮罩类名
    type: String,
    default: ''
  },
  overlayStyle: { // 自定义遮罩样式
    type: Object as PropType<CSSProperties>
  },
  closeOnClickOverlay: { // 点击遮罩时是否关闭
    type: Boolean,
    default: true
  }
} as const);

export const OverlayEmits = {
  [CLICK_EVENT]: (newVal: number, oldVal: number) => [newVal, oldVal].every(isNumber)
};
export type OverlayEmits = typeof OverlayEmits;
