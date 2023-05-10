<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { buildProps } from '../../../utils/props';
import { useNamespace } from '../../../hooks';

const spaceItem = buildProps({
  prefixCls: {
    type: String,
    default: ''
  }
} as const);

export default defineComponent({
  props: spaceItem,

  setup(props) {
    const ns = useNamespace('space');

    const classes = computed(() => `${props.prefixCls || ns.b()}__item`);

    return {
      classes
    };
  }
});
</script>
