<template>
  <li :class="[ns.b()]">
    <div :class="ns.e('tail')"></div>
    <div
      v-if="!$slots.dot"
      :class="[ns.e('node'), ns.em('node', size || ''), ns.em('node', type || ''), ns.is('hollow', hollow)]"
      :style="{
        backgroundColor: color
      }"
    >
      <icon v-if="icon" icon="l-chenggong" :class="ns.e('icon')"></icon>
    </div>
    <div v-if="$slots.dot" :class="ns.e('dot')">
      <slot name="dot"></slot>
    </div>
    <div :class="ns.e('wrapper')">
      <div v-if="(!hideTimestamp && placement === 'top') || $slots.header" :class="[ns.e('timestamp'), ns.is('top')]">
        <slot name="header">{{ timestamp }}</slot>
      </div>
      <div :class="ns.e('content')">
        <slot></slot>
      </div>
      <div v-if="!hideTimestamp && placement === 'bottom'" :class="[ns.e('timestamp'), ns.is('bottom')]">
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { TimelineItemProps } from './timeline-item';
import { Icon } from '../../icon/index';
const { create } = createComponent('TimelineItem');

export default create({
  components: {
    Icon
  },
  props: TimelineItemProps,
  setup(props) {
    const ns = useNamespace('timeline-item');

    return {
      ns
    };
  }
});
</script>
