<template>
  <div :class="[ns.b(), ns.m(simple ? 'simple' : direction)]">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, Ref, toRefs, ref } from 'vue';
import { StepsProps, StepsEmits } from './steps'
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import type { StepItemState } from './step.vue'

const { create } = createComponent('Steps');

export default create({
    props: StepsProps,
    emits: StepsEmits,
    setup(props, { emit }) {
        const ns = useNamespace('steps')
        const steps: Ref<StepItemState[]> = ref([])
        const { simple } = toRefs(props);

        provide('lSteps', { props, steps })
        return {
            ns,
            simple
        }
    }
});
</script>
