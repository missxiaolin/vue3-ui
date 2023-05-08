<template>
  <i :class="['l-icon', icon]" :style="style" v-bind="$attrs">
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { isNumber, isString } from '../../../utils/util';
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
  },
  setup(props) {
    return {
      componentName,
      style: computed<CSSProperties>(() => {
        if (!props.size && !props.color) {
          return {};
        }
        let size = props.size;
        if (isNumber(size) || (isString(size) && !size.endsWith('px'))) {
          size = `${size}px`;
        }
        return {
          ...(props.size ? { '--l-icon-font-size': size } : {}),
          ...(props.color ? { '--l-icon-font-color': props.color } : {})
        } as CSSProperties;
      })
    }
  }
});
</script>
