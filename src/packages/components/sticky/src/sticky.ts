import { buildProps, definePropType } from '../../../utils/props';
import type { ExtractPropTypes } from 'vue';
import type { ZIndexProperty } from 'csstype';
import type Sticky from './sticky.vue';

export const stickyProps = buildProps({
  zIndex: {
    type: definePropType<ZIndexProperty>([Number, String]),
    default: 100
  },
  target: {
    type: String,
    default: ''
  },
  offset: {
    type: Number,
    default: 0
  },
  position: {
    type: String,
    values: ['top', 'bottom'],
    default: 'top'
  }
} as const);
export type StickyProps = ExtractPropTypes<typeof stickyProps>;

export const stickyEmits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) =>
    typeof scrollTop === 'number' && typeof fixed === 'boolean',
  change: (fixed: boolean) => typeof fixed === 'boolean'
};
export type StickyEmits = typeof stickyEmits;

export type StickyInstance = InstanceType<typeof Sticky>;
