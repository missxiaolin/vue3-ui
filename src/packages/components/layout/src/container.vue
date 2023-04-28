<template>
  <section class="l-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { computed } from 'vue';
import type { Component, VNode } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Container');

export default create({
  props: {
    direction: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const isVertical = computed(() => {
      if (props.direction === 'vertical') {
        return true;
      } else if (props.direction === 'horizontal') {
        return false;
      }
      if (slots && slots.default) {
        const vNodes: VNode[] = slots.default();
        return vNodes.some((vNode) => {
          const tag = (vNode.type as Component).name;
          return tag === 'LHeader' || tag === 'LFooter';
        });
      } else {
        return false;
      }
    });
    return {
      componentName,
      isVertical
    };
  }
});
</script>
