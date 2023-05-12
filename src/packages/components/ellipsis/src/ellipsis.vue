<template>
  <div ref="root" :class="['l-ellipsis']">
    {{ expanded ? content : text }}
    <span class="l-ellipsis-span" v-if="hasAction" @click="onClickAction">
      {{ expanded ? collapseText : expandText }}
    </span>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, watch, onMounted } from 'vue';
import createComponent from '../../../utils/create';
import { EllipsisProps } from './ellipsis';
const { componentName, create } = createComponent('Ellipsis');

export default create({
  props: EllipsisProps,
  emits: ['clickAction'],
  setup(props, { emit }) {
    const text = ref('');
    const expanded = ref(false);
    const hasAction = ref(false);
    const root = ref<HTMLElement>();

    const { rows, dots, content, expandText, collapseText } = toRefs(props);

    const pxToNum = (value: string | null) => {
      if (!value) return 0;
      const match = value.match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    };

    const calcEllipsised = () => {
      const cloneContainer = () => {
        if (!root.value) return;

        const originStyle = window.getComputedStyle(root.value);
        const container = document.createElement('div');
        const styleNames: string[] = Array.prototype.slice.apply(originStyle);
        styleNames.forEach((name) => {
          container.style.setProperty(name, originStyle.getPropertyValue(name));
        });
        container.style.position = 'fixed';
        container.style.zIndex = '-9999';
        container.style.top = '-9999px';
        container.style.height = 'auto';
        container.style.minHeight = 'auto';
        container.style.maxHeight = 'auto';
        container.innerText = content.value;
        document.body.appendChild(container);
        return container;
      };

      const calcEllipsisText = (container: HTMLDivElement, maxHeight: number) => {
        let left = 0;
        let right = content.value.length;
        let res = -1;

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          container.innerText = content.value.slice(0, mid) + dots.value + expandText.value;
          if (container.offsetHeight <= maxHeight) {
            left = mid + 1;
            res = mid;
          } else {
            right = mid - 1;
          }
        }
        return content.value.slice(0, res) + dots.value;
      };

      const container = cloneContainer();
      if (!container) return;

      const { paddingBottom, paddingTop, lineHeight } = container.style;
      const maxHeight = (Number(rows.value) + 0.5) * pxToNum(lineHeight) + pxToNum(paddingTop) + pxToNum(paddingBottom);
      if (maxHeight < container.offsetHeight) {
        hasAction.value = true;
        text.value = calcEllipsisText(container, maxHeight);
      } else {
        hasAction.value = false;
        text.value = content.value;
      }

      document.body.removeChild(container);
    };

    onMounted(calcEllipsised);

    watch(() => [content.value, props.rows], calcEllipsised);

    const onClickAction = (event: MouseEvent) => {
      expanded.value = !expanded.value;
      emit('clickAction', event);
    };

    return {
      componentName,
      onClickAction,
      expanded,
      text,
      hasAction,
      collapseText,
      expandText,
      root
    };
  }
});
</script>
