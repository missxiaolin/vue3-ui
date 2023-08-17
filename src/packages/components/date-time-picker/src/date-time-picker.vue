
<template>
<div :class="ns.b()">
  
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('Date-Time-Picker');

export default create({
setup(props, { emit }) {
  const ns = useNamespace('date-time-picker');

  return {
    ns
  };
}
});
</script>

