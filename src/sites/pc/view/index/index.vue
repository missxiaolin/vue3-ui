<template>
  <l-container class="doc-content-wapper">
    <l-aside class="doc-aside-wapper flex flex-cl" width="230px">
      <div class="doc-logo">
        logo
      </div>
      <div class="flex-1">
        <doc-nav></doc-nav>
      </div>
    </l-aside>
    <l-container>
      <l-header>
        <doc-header></doc-header>
      </l-header>
      <l-main>
        <div class="doc-content">
          <div class="doc-content-document">
            <router-view />
          </div>
        </div>
      </l-main>
    </l-container>
  </l-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/sites/pc/components/header.vue';
import Nav from '@/sites/pc/components/nav.vue';


export default defineComponent({
  name: 'Index',
  components: {
    [Header.name]: Header,
    [Nav.name]: Nav
  }
});
</script>

<style lang="scss" scoped>
.doc {
  &-content {
    display: flex;
    flex-direction: column;
  }
}
</style>