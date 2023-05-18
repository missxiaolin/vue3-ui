import { buildProps, definePropType } from '../../../utils/props';

export const ScrollProps = buildProps({
  width: {
    type: [String, Number],
    default: ''
  },
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  maxWidth: {
    type: [String, Number],
    default: ''
  },
  offset: {
    type: [String, Number],
    default: 100
  },
  native: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  },
  viewClass: {
    type: [String, Array],
    default: ''
  },
  viewStyle: {
    type: [String, Array],
    default: ''
  },
  trigger: {
    type: String,
    default: 'always' // hover 鼠标移动上去显示 always 一直显示 none 不显示
  },
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  direction: {
    type: String,
    default: 'all' // all 横向 纵向 都出现滚动条 x 水平 y 垂直
  },
  vBarStyle: Object,
  hBarStyle: Object,
  vThumbStyle: Object,
  hThumbStyle: Object,
  finished: {
    type: Boolean,
    default: false // 加载是否完成，完成后load不会Emitted事件
  },
  finishedText: {
    type: String,
    default: '你已经看到我的底线啦~'
  },
  canOnLoad: {
    // 下拉加载 默认启用
    type: Boolean,
    default: true
  },
  // 滚动容器的id
  scrollId: {
    type: String,
    default: ''
  },
  // 滚动行为模式
  scrollWrapStyle: Object
});
