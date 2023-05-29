<template>
  <slot />
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
const { create } = createComponent('CollectionItem');
export default create({
  inheritAttrs: false
});
</script>
