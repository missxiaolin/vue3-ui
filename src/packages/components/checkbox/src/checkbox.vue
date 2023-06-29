<template>
  <div :class="ns.b()"> s </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('CheckBox');

export default create({
  setup(props, { emit }) {
    const ns = useNamespace('CheckBox');

    return {
      ns
    };
  }
});
</script>
