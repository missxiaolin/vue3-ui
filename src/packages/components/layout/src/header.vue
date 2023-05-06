<template>
  <header class="e-header" :style="style">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Header');

export default create({
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      componentName,
      style: computed(
        () =>
          (props.height
            ? {
                '--e-header-height': props.height
              }
            : {}) as CSSProperties
      )
    };
  }
});
</script>
