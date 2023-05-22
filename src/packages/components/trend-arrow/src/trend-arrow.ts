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
  syncTextColor: { // 文字颜色是否与箭头同步
    type: Boolean,
    default: true
  },
  textColor: { // 文字颜色
    type: String,
    default: '#333'
  },
  riseColor: { // 向上箭头颜色
    type: String,
    default: '#fa2c19'
  },
  dropColor: { // 向下箭头颜色
    type: String,
    default: '#64b578'
  }
} as const);
