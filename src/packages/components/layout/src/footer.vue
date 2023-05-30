<template>
  <footer class="l-footer" :style="style">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Footer');

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
                '--l-footer-height': props.height
              }
            : {}) as CSSProperties
      )
    };
  }
});
</script>
