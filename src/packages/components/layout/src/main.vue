<template>
  <main class="e-main">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Main');

export default create({
  setup(prop) {
    componentName;
  }
});
</script>
