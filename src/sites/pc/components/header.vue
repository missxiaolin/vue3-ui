<template>
  <div class="doc-header">
    <div class="header-logo">
      <a class="logo-link" href="/" @click="toHome"></a>
      <span class="logo-border"></span>
      <span class="version">v{{ version }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RefData } from '../../assets/utils/ref'

export default defineComponent({
  name: 'doc-header',

  setup() {
    let version = ref<string>('1.0.0');

    const toHome = () => {
      RefData.getInstance().currentRoute.value = '/';
    };
    return {
      version,
      toHome
    };
  }
});
</script>

<style lang="scss">
</style>