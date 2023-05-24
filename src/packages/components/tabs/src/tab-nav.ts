import {
  defineComponent,
  ExtractPropTypes,
  Fragment,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  ref,
  renderSlot,
  watch,
  inject
} from 'vue';
import { NOOP, capitalize } from '@vue/shared';
import { useResizeObserver, useDocumentVisibility, useWindowFocus } from '@vueuse/core';

import createComponent from '../../../utils/create';
import { buildProps, definePropType, mutable } from '../../../utils/props';
import { TabsPaneContext, tabsRootContextKey } from '../../../tokens/tabs';
import { throwError } from '../../../utils/error';
export const tabNavProps = buildProps({
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const)
  },
  currentName: {
    type: [String, Number],
    default: ''
  },
  editable: Boolean,
  onTabClick: {
    type: definePropType<(tab: TabsPaneContext, tabName: string | number, ev: Event) => void>(Function),
    default: NOOP
  },
  onTabRemove: {
    type: definePropType<(tab: TabsPaneContext, ev: Event) => void>(Function),
    default: NOOP
  },
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: ''
  },
  stretch: Boolean
} as const);

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>;

const { create } = createComponent('TabNav');

export default create({
  props: tabNavProps,
  setup(props, { emit, slots, expose }) {
    const visibility = useDocumentVisibility();
    const focused = useWindowFocus();
    const lui$ = ref<HTMLDivElement>();
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs) throwError('TabNav', `ETabNav must be nested inside ETabs`);
    
    return () => {
      return h('div', {
        ref: lui$,
        class: ['l-tabs__nav-wrap']
      });
    };
  }
});
