export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const checkNumber = (value: string) => /^\d+\.?\d*$/.test(value);
export const componentSize = ['large', 'medium', 'small', 'mini'] as const;
export const inputNumberProps = {
  modelValue: {
    type: Number,
    required: true
  },
  // 数值精度
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === parseInt(`${val}`, 10)
  },
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  // 计数器步长
  step: {
    type: Number,
    default: 1
  },
  // 是否只能输入 step 的倍数
  stepStrictly: {
    type: Boolean,
    default: false
  },
  // 防爆点击时间
  clickTime: {
    type: Number,
    default: 100
  },
  size: {
    type: String,
    values: componentSize
  },
  controls: {
    type: Boolean,
    default: true
  },
  controlsRight: Boolean,
  disabled: Boolean
} as const;
