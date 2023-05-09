import { buildProps } from '../../../utils/props';
import type { ExtractPropTypes } from 'vue';

export const linkTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger', 'gary', ''] as const;

export const linkProps = buildProps({
  type: {
    type: String,
    values: linkTypes,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
} as const);
export type LinkProps = ExtractPropTypes<typeof linkProps>;
