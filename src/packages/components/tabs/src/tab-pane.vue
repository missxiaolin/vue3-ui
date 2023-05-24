<template>
  <div
    v-if="shouldBeRender"
    v-show="active"
    :id="`pane-${paneName}`"
    :class="ns.b()"
    role="tabpanel"
    :aria-hidden="!active"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, inject, getCurrentInstance, watch, markRaw, reactive } from 'vue';
import createComponent from '../../../utils/create';
import { eagerComputed } from '@vueuse/core';
import { useNamespace } from '../../../hooks';
import { TabPaneProps } from './tab-pane';
import { throwError } from '../../../utils/error';
import { tabsRootContextKey } from '../../../tokens/tabs';
const { create } = createComponent('TabPane');

export default create({
  props: TabPaneProps,
  setup(props) {
    const ns = useNamespace('tab-pane');
    const instance = getCurrentInstance()!;
    const tabsRoot = inject(tabsRootContextKey);
    if (!tabsRoot) throwError('TabPane', `must use with TabPane.vue`);
    const index = ref<string>();
    const loaded = ref(false);
    const isClosable = computed(() => props.closable || tabsRoot.props.closable);
    const active = eagerComputed(() => tabsRoot.currentName.value === (props.name || index.value));
    const paneName = computed(() => props.name || index.value);
    const shouldBeRender = eagerComputed(() => !props.lazy || loaded.value || active.value);
    watch(active, (val) => {
      if (val) loaded.value = true;
    });
    tabsRoot.updatePaneState(
      reactive({
        uid: instance.uid,
        instance: markRaw(instance),
        props,
        paneName,
        active,
        index,
        isClosable
      })
    );
    return {
      ns,
      active,
      paneName,
      shouldBeRender
    };
  }
});
</script>
