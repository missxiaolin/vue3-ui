<template>
  <div class="l-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { nextTick, provide, toRefs, reactive, PropType } from 'vue';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import createComponent from '../../..//utils/create';
import { groupCheckboxProps } from './checkboxGroup';
const { create } = createComponent('CheckboxGroup');
export default create({
  props: groupCheckboxProps,
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, { emit }) {
    const changeEvent = (value: any) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => {
        emit('change', value);
      });
    };
    provide(
      'checkboxGroupKey',
      reactive({
        name: 'checkboxGroup',
        ...toRefs(props),
        changeEvent
      })
    );
  }
});
</script>
