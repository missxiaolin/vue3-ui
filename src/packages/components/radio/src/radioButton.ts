const sizes = ['', 'large', 'medium', 'small', 'mini'];
const radioProps = {
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
  border: Boolean
};
export default { radioProps };
