<template>
  <div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from 'vue';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import createComponent from '../../../utils/create';
import { stickyEmits, stickyProps } from './sticky';
const { create } = createComponent('Sticky');

export default create({
  props: stickyProps,
  emits: stickyEmits
});
</script>
