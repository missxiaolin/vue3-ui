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
    <div v-else :class="ns.b('circle')" :style="{ height: `${width}px`, width: `${width}px` }">
      <svg viewBox="0 0 100 100">
        <path
          :class="ns.be('circle', 'track')"
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="trailPathStyle"
        />
        <path
          :class="ns.be('circle', 'path')"
          :d="trackPath"
          :stroke="stroke"
          fill="none"
          :stroke-linecap="strokeLinecap"
          :stroke-width="percentage ? relativeStrokeWidth : 0"
          :style="circlePathStyle"
        />
      </svg>
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

    const barStyle = computed(
      (): CSSProperties => ({
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`,
        backgroundColor: getCurrentColor(props.percentage)
      })
    );

    const relativeStrokeWidth = computed(() => ((props.strokeWidth / props.width) * 100).toFixed(1));

    const radius = computed(() => {
      if (props.type === 'circle' || props.type === 'dashboard') {
        return parseInt(`${50 - parseFloat(relativeStrokeWidth.value) / 2}`, 10);
      } else {
        return 0;
      }
    });

    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === 'dashboard';
      return `
      M 50 50
      m 0 ${isDashboard ? '' : '-'}${r}
      a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
      a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
      `;
    });

    const perimeter = computed(() => 2 * Math.PI * radius.value);

    const rate = computed(() => (props.type === 'dashboard' ? 0.75 : 1));

    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.value * (1 - rate.value)) / 2;
      return `${offset}px`;
    });

    const trailPathStyle = computed(
      (): CSSProperties => ({
        strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value
      })
    );

    const circlePathStyle = computed(
      (): CSSProperties => ({
        strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
      })
    );

    const stroke = computed(() => {
      let ret: string;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        switch (props.status) {
          case 'success':
            ret = '#13ce66';
            break;
          case 'exception':
            ret = '#ff4949';
            break;
          case 'warning':
            ret = '#e6a23c';
            break;
          default:
            ret = '#20a0ff';
        }
      }
      return ret;
    });

    const statusIcon = computed(() => {
      if (props.status === 'warning') {
        return 'l-jinggao';
      }
      if (props.type === 'line') {
        return props.status === 'success' ? 'l-zhengque' : 'l-cuowu';
      } else {
        return props.status === 'success' ? 'l-chenggong' : 'l-cuowuguanbishibai';
      }
    });

    const progressTextSize = computed(() => {
      return props.type === 'line' ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });

    const content = computed(() => props.format(props.percentage));

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

    const slotData = computed(() => {
      return {
        percentage: props.percentage
      };
    });

    return {
      ns,
      barStyle,
      relativeStrokeWidth,
      radius,
      trackPath,
      perimeter,
      rate,
      strokeDashoffset,
      trailPathStyle,
      circlePathStyle,
      stroke,
      statusIcon,
      progressTextSize,
      content,
      slotData
    };
  }
});
</script>
