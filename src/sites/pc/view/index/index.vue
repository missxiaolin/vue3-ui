<template>
  <div>
    <doc-header></doc-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/header.vue';

export default defineComponent({
  name: 'Index',
  components: {
    [Header.name]: Header
  }
});
</script>

<style lang="scss" scoped>
.doc {
  &-content {
    margin-left: 290px;
    display: flex;
    flex-direction: column;
  }
}
</style>