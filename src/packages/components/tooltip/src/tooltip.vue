<template>
  <popper ref="popperRef">
    <slot name="content">
      <slot></slot>
    </slot>
  </popper>
</template>

<script lang="ts">
import { computed, ref, provide, toRef, readonly, unref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { Popper } from '../../popper/index';
const { create } = createComponent('Tooltip');

export default create({
  components: {
    Popper
  },
  setup(props, { emit }) {
    const ns = useNamespace('tooltip');

    return {
      ns
    };
  }
});
</script>
