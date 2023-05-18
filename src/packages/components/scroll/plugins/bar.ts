import { buildProps, definePropType } from '../../../utils/props';

export const BarProps = buildProps({
  parentRef: {
    type: [String, Boolean, Number],
    required: true
  },
  direction: {
    type: String,
    default: 'vertical' // 支出2个值 水平 horizontal 垂直 vertical
  },
  size: {
    // thumb的宽度或高度
    type: String
  },
  move: {
    type: String
  },
  trigger: {
    type: String,
    default: 'hover' // hover 鼠标移动上去显示 always 一直显示 none 不显示
  },
  barStyle: {
    // 设置轨道
    type: Object,
    default: () => ({
      'background-color': ''
    })
  },
  thumbStyle: {
    // 设置滑块
    type: Object,
    default: () => ({
      'background-color': 'rgba(0, 0, 0, 0.2)'
    })
  }
});
