<template>
  <div :class="[ns.b()]" role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CollapseProps, CollapseEmits } from './collapse'

const { create } = createComponent('Collapse');
export default create({
  props: CollapseProps,
  emits: CollapseEmits,
  setup() {
    const ns = useNamespace('collapse');

    return {
      ns
    };
  }
});
</script>
