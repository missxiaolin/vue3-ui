<template>
  <l-loading-bar>
    <router-view></router-view>
  </l-loading-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "app",
});
</script>

<style lang="scss"></style>
