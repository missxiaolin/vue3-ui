import type { ExtractPropTypes } from 'vue';

export const StatisticProps = {
  label: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: ''
  },
  size: {
    type: [String, Number],
    default: ''
  },
  italic: {
    type: Boolean,
    default: true
  },
  top: {
    type: Boolean,
    default: false
  }
};
export type StatisticProps = ExtractPropTypes<typeof StatisticProps>;
