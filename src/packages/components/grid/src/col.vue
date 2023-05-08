<template>
  <div class="l-col" :class="[colWidthClass]" :style="colStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, inject, toRefs } from 'vue';
import { objTy } from '../../../utils/types';
import { hasOwn } from '../../../utils/util';
import type { CSSProperties } from 'vue';
import { isNumber, isString } from '../../../utils/util';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Col');

export default create({
  // inheritAttrs: false,
  props: {
    flex: String || Number,
    label: String,
    isText: {
      // 绑定v-model 情况下使用 文本显示
      type: Boolean,
      default: false
    },
    empty: {
      // istext 情况下value 为空显示
      type: String,
      default: '-'
    },
    labelColor: String,
    labelWidth: String
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    // ({ '--e-aside-width': '6px' } as CSSProperties);
    const colAttrs = toRefs(props);
    // 接收 Row 传下来的数据
    const parentAttrs = inject<any>('colAttrs', undefined);
    // col 宽度计算
    const colWidthClass = computed(() => {
      const attrsCol = parentAttrs.cols || 0;
      let colClass: objTy = {
        'flex-1': !attrsCol
      };
      const widthClass = `l-col-width-${attrsCol}`;
      if (attrsCol) {
        colClass[widthClass] = !!widthClass;
      }
      return colClass;
    });

    // col style
    const colStyles = computed(() => {
      // 获取 row 一行几列属性
      const colsVal = parentAttrs.cols && Number(parentAttrs.cols);
      // 获取当前自定义 col flex 属性
      const colFlexVal = (colAttrs.flex?.value && Number(colAttrs.flex?.value)) || 0;
      // 获取 row 定义 间隔属性
      let gutterVla = parentAttrs.gutter;
      if (isNumber(gutterVla) || (isString(gutterVla) && !gutterVla.endsWith('px'))) {
        gutterVla = `${gutterVla}px`;
      }
      // 计算 当  col:flex >=  row: cols 则取 flex
      const gColsVal = colsVal >= colFlexVal ? colFlexVal : colsVal - (colFlexVal - 1);
      const style: objTy = {};
      colsVal && (style['--l-rows-grid'] = colsVal);
      colFlexVal && (style['--l-col-flex'] = colFlexVal ? (gColsVal <= 0 ? 1 : gColsVal) : 1);
      gutterVla && (style['--l-col-gutter-width'] = gutterVla);
      return style as CSSProperties;
    });
    return {
        componentName,
        colWidthClass,
        colStyles
    }
  }
});
</script>
