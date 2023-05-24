import { buildProps, definePropType, mutable } from '../../../utils/props';
import type { TabsPaneContext } from '../../../tokens/tabs';
import type { ExtractPropTypes } from 'vue';

export const TabBar = buildProps({
  tabs: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const)
  }
} as const);

export type TabBar = ExtractPropTypes<typeof TabBar>;
