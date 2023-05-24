<template>
  <div ref="bar$" :class="['l-tabs__active-bar', `is-${rootTabs.props.tabPosition}`]" :style="barStyle"></div>
</template>

<script lang="ts">
import { inject, getCurrentInstance, watch, nextTick, ref } from 'vue';
import { capitalize } from '@vue/shared';
import { useResizeObserver } from '@vueuse/core';
import { tabsRootContextKey } from '../../../tokens/tabs';
import { throwError } from '../../../utils/error';
import { TabBar } from './tab-bar';
import type { CSSProperties } from 'vue';

import createComponent from '../../../utils/create';
const { create } = createComponent('TabBar');

export default create({
  props: TabBar,
  setup(props) {
    const instance = getCurrentInstance()!;
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs) throwError('TabBar', 'must use with TabBar.vue');
    const bar$ = ref<HTMLDivElement>();
    const barStyle = ref();
    const getBarStyle = (): CSSProperties => {
      let offset = 0;
      let tabSize = 0;
      const sizeName = ['top', 'bottom'].includes(rootTabs.props.tabPosition) ? 'width' : 'height';
      const sizeDir = sizeName === 'width' ? 'x' : 'y';
      props.tabs.every((tab) => {
        const $el: any = instance.parent?.refs?.[`tab-${tab.paneName}`] as HTMLElement;
        if (!$el) return false;
        if (!tab.active) {
          return true;
        }
        tabSize = $el[`client${capitalize(sizeName)}`];
        const position = sizeDir === 'x' ? 'left' : 'top';
        offset = $el.getBoundingClientRect()[position] - ($el.parentElement?.getBoundingClientRect()[position] ?? 0);
        const tabStyles = window.getComputedStyle($el);
        if (sizeName === 'width') {
          if (props.tabs.length > 1) {
            tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
          }
          offset += parseFloat(tabStyles.paddingLeft);
        }
        return false;
      });
      return {
        [sizeName]: `${tabSize}px`,
        transform: `translate${capitalize(sizeDir)}(${offset}px)`
      };
    };
    const update = () => (barStyle.value = getBarStyle());
    watch(
      () => props.tabs,
      async () => {
        await nextTick();
        update();
      },
      { immediate: true }
    );
    useResizeObserver(bar$, () => update());
    return {
      bar$,
      rootTabs,
      barStyle,
      update
    };
  }
});
</script>
