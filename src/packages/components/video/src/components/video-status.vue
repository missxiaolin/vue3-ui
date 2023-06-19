<template>
  <div class="l-status" v-show="state.handleType || state.isMultiplesPlay">
    <li class="l-flex-center" v-show="state.handleType == 'volume'">
      <icon
        size="18"
        class="l-status-icon"
        :icon="`${state.volume == 0 ? 'l-jingyin' : state.volume > 0.5 ? 'l-yinliang3' : 'l-yinliang1'}`"
      ></icon>
      {{ ~~(state.volume * 100) }}%
    </li>
    <li class="l-flex-center" v-show="state.handleType == 'playbackRate' || state.isMultiplesPlay">
      <icon size="12" icon="l-play"></icon>
      <icon size="12" icon="l-play" style="margin-right: 5px"></icon>5X速播放中
    </li>
  </div>
</template>

<script lang="ts">
import { Icon } from '../../../icon/index';
import createComponent from '../../../../utils/create';
import { toRaw } from 'vue';
const { create } = createComponent('VideoStatus');

export default create({
  components: {
    Icon
  },
  props: {
    state: {
      type: Object
    }
  },
  setup(props, { emit }) {
    return {
      state: toRaw(props.state)
    };
  }
});
</script>
