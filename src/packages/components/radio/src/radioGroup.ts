const sizes = ['', 'large', 'medium', 'small', 'mini'];
export const radioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String,
    values: sizes,
    default: ''
  },
  direction: {
    type: String,
    default: 'transverse'
  },
  disabled: Boolean
};
