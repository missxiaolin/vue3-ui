import type { ExtractPropTypes } from 'vue';
import { buildProps } from '../../../utils/props';

export const PanelProps = buildProps({
  title: {
    type: String,
    default: ''
  },
  bodyStyle: {
    type: [String, Object, Array],
    default: ''
  },
  shadow: {
    type: String,
    default: 'hover'
  },
  headGray: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  close: {
    type: Boolean,
    default: false
  }
});

export type PanelProps = ExtractPropTypes<typeof PanelProps>;
