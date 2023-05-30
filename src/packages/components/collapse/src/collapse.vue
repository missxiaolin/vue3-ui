<template>
  <div
    :class="[
      ns.b(),
      {
        'l-collpse-title-background': background
      }
    ]"
    role="tablist"
    aria-multiselectable="true"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, watch, provide, toRef } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CollapseProps, CollapseEmits } from './collapse';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import type { CollapseProvider } from './collapse.type';

const { create } = createComponent('Collapse');
export default create({
  props: CollapseProps,
  emits: CollapseEmits,
  setup(props, { emit }) {
    const ns = useNamespace('collapse');
    const activeNames = ref([].concat(props.modelValue));
    const openAwayNames = ref([].concat(props.modelValue));

    const setActiveNames = (_activeNames: ConcatArray<never>, openAwayNames?: ConcatArray<never>) => {
      activeNames.value = [].concat(_activeNames);
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      if (openAwayNames) return;
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
    };

    const handleItemClick = (name: any) => {
      if (props.accordion) {
        const currentName =
          (activeNames.value[0] || activeNames.value[0] === 0) && activeNames.value[0] === name ? '' : name;
        if (props.openAway && name == activeNames.value[0]) {
          emit(CHANGE_EVENT, name);
          emit(UPDATE_MODEL_EVENT, name);
          openAwayNames.value = name;
          setActiveNames(currentName, name);
          return;
        } else {
          openAwayNames.value = currentName;
        }
        setActiveNames(currentName);
      } else {
        const _activeNames = activeNames.value.slice(0);
        const index = _activeNames.indexOf(name);

        if (index > -1) {
          _activeNames.splice(index, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };

    watch(
      () => props.modelValue,
      () => {
        activeNames.value = [].concat(props.modelValue);
        openAwayNames.value = [].concat(props.modelValue);
      }
    );
    provide<CollapseProvider>('collapse', {
      activeNames,
      openAwayNames,
      handleItemClick,
      openAway: toRef(props, 'openAway'),
      background: toRef(props, 'background')
    });

    return {
      ns,
      activeNames,
      setActiveNames,
      handleItemClick
    };
  }
});
</script>
