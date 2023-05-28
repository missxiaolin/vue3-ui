
<template>
<div :class="ns.b()">
  <slot></slot>
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('Tooltip');

export default create({
setup(props, { emit }) {
  const ns = useNamespace('tooltip');

  return {
    ns
  };
}
});
</script>

