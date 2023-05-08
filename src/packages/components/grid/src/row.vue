<template>
  <div :class="['l-row', rowFlexColumnClass]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { toRefs, provide } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Row');
export const colAttrs = Symbol();
export default create({
  props: {
    gutter: [String, Number],
    grid: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    cols: [String, Number],
    labelWidth: String,
    labelColumn: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { vertical } = toRefs(props);
    const rowVertical = vertical.value;
    // 接口定义
    interface rcolTy {
      [propName: string]: any;
    }
    const rowFlexColumnClass: rcolTy = {
      'is-flex-column': rowVertical
    };
    // provide 传递 属性至 Col 组件
    provide('colAttrs', props);

    return {
      componentName,
      rowFlexColumnClass
    };
  }
});
</script>
