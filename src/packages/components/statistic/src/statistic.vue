<template>
  <dl :class="ns.b()">
    <dt v-if="($slots.label || label) && top" :class="[top && ns.e('top')]">
      <slot name="label">{{ label }}</slot>
    </dt>
    <dd :class="ns.e('data')" :style="Style">
      <slot>{{ value }}</slot>
    </dd>
    <dt v-if="($slots.label || label) && !top">
      <slot name="label">{{ label }}</slot>
    </dt>
  </dl>
</template>

<script lang="ts">
import { computed, ref, watch, toRaw, toRefs } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { objTy } from '../../../utils/types';
import { StatisticProps } from './statistic';

const { componentName, create } = createComponent('Statistic');

export default create({
  props: StatisticProps,
  setup(props) {
    const ns = useNamespace('statistic');
    const { size, italic } = toRefs(props);

    const Style = computed(() => {
      const sSize = size?.value || '';
      const sItalic = !italic.value;
      const style: objTy = {};
      sSize && (style['--l-statistic-font-size'] = sSize + 'px');
      sItalic && (style['--l-statistic-font-italic'] = 'indianred');
      return style;
    });

    return {
      componentName,
      ns,
      Style
    };
  }
});
</script>
