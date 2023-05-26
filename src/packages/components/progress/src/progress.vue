<template>
  <div
    :class="[
      ns.b(),
      ns.m(type),
      ns.is(status),
      {
        [ns.m('without-text')]: !showText,
        [ns.m('text-inside')]: textInside
      }
    ]"
  >
    <div v-if="type === 'line'" :class="ns.b('bar')">
      <div :class="ns.be('bar', 'outer')" :style="{ height: `${strokeWidth}px` }">
        <div
          :class="[ns.be('bar', 'inner'), { [ns.bem('bar', 'inner', 'indeterminate')]: indeterminate }]"
          :style="barStyle"
        >
          <div v-if="(showText || $slots.default) && textInside" :class="ns.be('bar', 'innerText')">
            <slot v-bind="slotData">
              <span>{{ content }}</span>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="(showText || $slots.default) && !textInside"
      :class="ns.e('text')"
      :style="{ fontSize: `${progressTextSize}px` }"
    >
      <slot v-bind="slotData">
        <span v-if="!status">{{ content }}</span>
        <icon v-else :icon="statusIcon"></icon>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { ProgressProps } from './progress';
import { Icon } from '../../icon/index';
const { create, useGlobalConfig } = createComponent('Progress');

export default create({
  components: {
    Icon
  },
  props: ProgressProps,
  setup(props, { emit }) {
    const ns = useNamespace('progress');

    const getCurrentColor = (percentage: number) => {
      const { color } = props;
      if (typeof color === 'function') {
        return color(percentage);
      } else if (typeof color === 'string') {
        return color;
      } else {
        const span = 100 / color.length;
        const seriesColors = color.map((seriesColor, index) => {
          if (typeof seriesColor === 'string') {
            return {
              color: seriesColor,
              percentage: (index + 1) * span
            };
          }
          return seriesColor;
        });
        const colors = seriesColors.sort((a, b) => a.percentage - b.percentage);

        for (const color of colors) {
          if (color.percentage > percentage) return color.color;
        }
        return colors[colors.length - 1]?.color;
      }
    };

    const barStyle = computed(
      (): CSSProperties => ({
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`,
        backgroundColor: getCurrentColor(props.percentage)
      })
    );

    const progressTextSize = computed(() => {
      return props.type === 'line' ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });

    const slotData = computed(() => {
      return {
        percentage: props.percentage
      };
    });

    const content = computed(() => props.format(props.percentage));

    const statusIcon = computed(() => {
      if (props.status === 'warning') {
        return 'l-jinggao';
      }
      if (props.type === 'line') {
        return props.status === 'success' ? 'l-zhengque' : 'l-cuowu';
      } else {
      }
    })

    return {
      ns,
      barStyle,
      slotData,
      progressTextSize,
      content,
      statusIcon
    };
  }
});
</script>
