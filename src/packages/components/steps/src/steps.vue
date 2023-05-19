<template>
  <div :class="[ns.b(), ns.m(simple ? 'simple' : direction)]">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, toRefs, watch } from 'vue';
import { StepsProps, StepsEmits } from './steps'
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('Steps');

export default create({
    props: StepsProps,
    emits: StepsEmits,
    setup(props, { emit }) {
        const ns = useNamespace('steps')
        const { simple } = toRefs(props);
        return {
            ns,
            simple
        }
    }
});
</script>
