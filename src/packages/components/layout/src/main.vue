<template>
  <main class="l-main">
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
