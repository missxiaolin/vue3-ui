<template>
  <l-container class="doc-content-wapper">
    <!-- <doc-header></doc-header>
    <div class="doc-content"> 待完善 </div>
    <doc-footer></doc-footer> -->
  </l-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/sites/pc/components/header.vue';
import Footer from '@/sites/pc/components/footer.vue';


export default defineComponent({
  name: 'Main',
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer
  }
});
</script>

<style lang="scss">

</style>