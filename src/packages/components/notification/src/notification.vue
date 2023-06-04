<template>
  <div :class="ns.b()"> </div>
</template>

<script lang="ts">
import { computed, CSSProperties, onUnmounted, onMounted, ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { NotificationProps, NotificationEmits } from './notification';
import { Icon } from '../../icon/index';
import { Button } from '../../button/index';
import { EVENT_CODE } from '../../../utils/aria';
const { componentName, create } = createComponent('Notification');

export default create({
  components: {
    LIcon: Icon,
    LButton: Button
  },
  props: NotificationProps,
  emits: NotificationEmits,
  setup(props, { emit }) {
    const ns = useNamespace('notification');

    return {
      ns
    };
  }
});
</script>
