<template>
  <div :class="ns.b()"> s s</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('Checkbox');

export default create({
  setup(props, { emit }) {
    const ns = useNamespace('Checkbox');

    return {
      ns
    };
  }
});
</script>
