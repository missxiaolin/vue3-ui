import { buildProps } from '../../../utils/props';
import type SkeletonItem from './skeleton-item.vue';
import type { ExtractPropTypes } from 'vue';

export const skeletonItemProps = buildProps({
  variant: {
    type: String,
    values: ['p', 'text', 'h1', 'h3', 'caption', 'button', 'image', 'circle', 'rect'],
    default: 'text'
  }
} as const);

export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>;
export type SkeletonItemInstance = InstanceType<typeof SkeletonItem>;
