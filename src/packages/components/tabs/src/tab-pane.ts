import { buildProps } from '../../../utils/props';
import type { ExtractPropTypes } from 'vue';

export const TabPaneProps = buildProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: [String, Number],
    default: ''
  },
  closable: Boolean,
  disabled: Boolean,
  lazy: Boolean
} as const);

export type TabPaneProps = ExtractPropTypes<typeof TabPaneProps>;
