const sizes = ['', 'large', 'medium', 'small', 'mini'];
export const radioProps = {
  size: {
    type: String,
    values: sizes,
    default: ''
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  disabled: Boolean,
  border: Boolean,
  dot: {
    // radio 圆点是否展示 默认 true 展示
    type: Boolean,
    default: true
  }
};
