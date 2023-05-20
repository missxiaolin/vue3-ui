<template>
  <div :class="[ns.b(), ns.m(simple ? 'simple' : direction)]">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, Ref, toRefs, ref, watch } from 'vue';
import { StepsProps, StepsEmits } from './steps';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import type { StepItemState } from './step.vue';
import { CHANGE_EVENT } from '../../../utils/constants';

const { create } = createComponent('Steps');

export default create({
  props: StepsProps,
  emits: StepsEmits,
  setup(props, { emit }) {
    const ns = useNamespace('steps');
    const steps: Ref<StepItemState[]> = ref([]);
    const { simple } = toRefs(props);

    watch(steps, () => {
      steps.value.forEach((instance: StepItemState, index: number) => {
        instance.setIndex(index);
      });
    });

    provide('lSteps', { props, steps });

    watch(
      () => props.active,
      (newVal: number, oldVal: number) => {
        emit(CHANGE_EVENT, newVal, oldVal);
      }
    );
    return {
      ns,
      simple
    };
  }
});
</script>
