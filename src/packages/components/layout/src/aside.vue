<template>
    <aside class="l-aside" :style="style">
      <slot></slot>
    </aside>
  </template>
  <script lang="ts">
  import { computed } from 'vue';
  import type { CSSProperties } from 'vue';
  import createComponent from '../../../utils/create';
  const { componentName, create } = createComponent('Aside');
  
  export default create({
    props: {
      width: {
        type: String,
        default: null
      }
    },
    setup(props) {
      return {
        componentName,
        style: computed(() => {
          return props.width ? ({ '--l-aside-width': props.width } as CSSProperties) : {};
        })
      };
    }
  });
  </script>
  