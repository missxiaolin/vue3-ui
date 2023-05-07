<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Icon');

export default create({
  inheritAttrs: false,
  props: {
    icon: String,
    size: {
      type: [Number, String]
    },
    color: {
      type: String
    }
  }
});
</script>
