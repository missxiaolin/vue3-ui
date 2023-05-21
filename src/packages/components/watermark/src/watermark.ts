import { buildProps } from '../../../utils/props';

export const WatermarkProps = buildProps({
  name: {
    type: String,
    default: ''
  },
  gapY: { // 水印之间的垂直间距
    type: Number,
    default: 48
  },
  gapX: { // 水印之间的水平间距
    type: Number,
    default: 24
  },
  zIndex: { // 追加的水印元素的 z-index
    type: Number,
    default: 2000
  },
  width: { // 水印的宽度
    type: Number,
    default: 120
  },
  height: { // 水印的高度
    type: Number,
    default: 64
  },
  rotate: { // 水印绘制时，旋转的角度
    type: Number,
    default: -22
  },
  image: { // 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印
    type: String,
    default: ''
  },
  imageWidth: { // 图片宽度
    type: Number,
    default: 120
  },
  imageHeight: { // 图片高度
    type: Number,
    default: 64
  },
  content: { // 水印文字内容
    type: String,
    default: ''
  },
  fontColor: { // 水印文字颜色
    type: String,
    default: 'rgba(0,0,0,.15)'
  },
  fontStyle: {
    type: String,
    default: 'normal'
  },
  fontFamily: { // 水印文字字体
    type: String,
    default: 'PingFang SC'
  },
  fontWeight: {
    type: String,
    default: 'normal'
  },
  fontSize: { // 文字大小
    type: [String, Number],
    default: 14
  },
  fullPage: { // 是否覆盖整个页面
    type: Boolean,
    default: false
  }
} as const);
