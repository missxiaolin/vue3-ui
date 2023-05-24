import {
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  ref,
  renderSlot,
  watch
} from 'vue';
import type { Component, ComponentInternalInstance, VNode, ExtractPropTypes, Ref } from 'vue';

import createComponent from '../../../utils/create';
import { buildProps, definePropType } from '../../../utils/props';
import TabNav from './tab-nav';
import { useNamespace } from '../../../hooks';
import { UPDATE_MODEL_EVENT, INPUT_EVENT } from '../../../utils/constants';
import type { TabsPaneContext } from '../../../tokens/tabs';

import { tabsRootContextKey } from '../../../tokens/tabs';

export const tabsProps = buildProps({
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: ''
  },
  activeName: {
    type: String,
    default: ''
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number],
    default: ''
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ['top', 'right', 'bottom', 'left'],
    default: 'top'
  },
  beforeLeave: {
    type: definePropType<
      (newTabName: string | number, oldTabName: string | number) => void | boolean | Promise<void | boolean>
    >(Function),
    default: () => true
  },
  stretch: Boolean
} as const);
export type TabsProps = ExtractPropTypes<typeof tabsProps>;
export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (tabName: string | number) => typeof tabName === 'string' || typeof tabName === 'number',
  [INPUT_EVENT]: (tabName: string | number) => typeof tabName === 'string' || typeof tabName === 'number',
  'tab-click': (pane: TabsPaneContext, ev: Event) => ev instanceof Event,
  edit: (paneName: string | number | null, action: 'remove' | 'add') => action === 'remove' || action === 'add',
  'tab-remove': (paneName: string | number) => typeof paneName === 'string' || typeof paneName === 'number',
  'tab-add': () => true
};

const { create } = createComponent('Tabs');

export default create({
  props: tabsProps,
  emits: tabsEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance()!;
    const ns = useNamespace('tabs');
    const nav$ = ref<InstanceType<typeof TabNav>>();
    const currentName = ref(props.modelValue || props.activeName || '0');
    const paneStatesMap: Record<number, TabsPaneContext> = {};

    watch(currentName, async () => {
      
    })
    // 子组件传递
    provide(tabsRootContextKey, {
      props,  
      currentName,
      updatePaneState: (pane) => (paneStatesMap[pane.uid] = pane)
    });

    return () => {
      return h('div', {
        ref: nav$,
        class: [ns.b(), ns.e('card')]
      });
    };
  }
});
