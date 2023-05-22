<template>
  <div :class="ns.b()">
    <span v-if="!arrowLeft" class="l-trend-arrow-icon-before l-trend-arrow-rate" :style="calcStyle">
      {{ calcRate }}
    </span>
    <slot name="up-icon" v-if="Number(rate) !== 0 && rateTrend">
      <Icon icon="l-xiangshang1" />
    </slot>
    <slot name="down-icon" v-if="Number(rate) !== 0 && !rateTrend">
      <Icon icon="l-xiangxia1" />
    </slot>
    <span v-if="arrowLeft" class="l-trend-arrow-icon-after l-trend-arrow-rate" :style="calcStyle">{{
      calcRate
    }}</span>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { TrendArrowProps } from './trend-arrow';
import { myFixed } from '../../../utils/util';
import { Icon } from '../../icon/index';

const { create } = createComponent('TrendArrow');

export default create({
  components: {
    Icon
  },
  props: TrendArrowProps,
  setup(props) {
    const ns = useNamespace('trend-arrow');
    const state = reactive({
      rateTrend: props.rate > 0 ? true : false
    });

    const calcRate = computed(() => {
      const { rate, digits, showSign, showZero } = props;
      state.rateTrend = rate > 0 ? true : false;
      const absRate = Math.abs(rate);
      if (!showZero && rate === 0) {
        return '--';
      }
      let resultRate = `${showSign && rate !== 0 ? (state.rateTrend ? '+' : '-') : ''}${myFixed(
        Number(absRate),
        digits
      )}%`;

      return resultRate;
    });

    const calcStyle = computed(() => {
      const { dropColor, riseColor, syncTextColor, textColor, rate } = props;
      let style = {
        color: rate === 0 ? textColor : syncTextColor ? (state.rateTrend ? riseColor : dropColor) : textColor
      };
      return style;
    });

    return {
      ns,
      ...toRefs(state),
      calcRate,
      calcStyle
    };
  }
});
</script>
