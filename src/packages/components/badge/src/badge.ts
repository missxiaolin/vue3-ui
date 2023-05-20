import type { ExtractPropTypes } from 'vue';

export const badgeProps = {
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: {
    type: Boolean,
    default: false
  },
  isTag: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger'],
    default: 'danger'
  }
};
export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
