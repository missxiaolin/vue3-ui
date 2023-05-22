import { buildProps } from '../../../utils/props';

export const TrendArrowProps = buildProps({
  rate: { // 数值，大于0时箭头向上，小于0时箭头向下
    type: Number,
    default: 0
  },
  digits: { // 小数位精度
    type: Number,
    default: 2
  },
  showSign: { // 是否显示加减号
    type: Boolean,
    default: false
  },
  showZero: { // 是否显示 0
    type: Boolean,
    default: false
  },
  arrowLeft: { // 是否在数字左侧显示箭头
    type: Boolean,
    default: false
  },
  textColor: { // 文字颜色
    type: String,
    default: '#333'
  },
  icon: {
    type: String,
    default: ''
  },
  iconColor: { // 向上箭头颜色
    type: String,
    default: '#fa2c19'
  }
} as const);
