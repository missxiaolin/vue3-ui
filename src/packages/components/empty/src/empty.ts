import { buildProps } from '../../../utils/props';
import type { ExtractPropTypes } from 'vue';

export const emptyProps = buildProps({
  imageSize: Number,
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
} as const);
export type EmptyProps = ExtractPropTypes<typeof emptyProps>;

export const emptyEmits = {
  click: () => true
};
export type EmptyEmits = typeof emptyEmits;
