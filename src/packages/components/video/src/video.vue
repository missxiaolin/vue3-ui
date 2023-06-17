
<template>
<div :class="ns.b()">
  
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('Video');

export default create({
setup(props, { emit }) {
  const ns = useNamespace('video');

  return {
    ns
  };
}
});
</script>

