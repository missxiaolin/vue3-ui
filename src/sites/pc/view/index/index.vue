<template>
  <l-container class="doc-content-wapper">
    <l-aside class="doc-aside-wapper flex flex-cl" width="230px">
      <div class="doc-logo">
        <img class="logo" :src="logo" alt="">
      </div>
      <div class="flex-1">
        <l-scroll ref="navScrollbarRef" class="doc-sroll-aside-height" :native="true" trigger="none" direction="y">
          <doc-nav></doc-nav>
        </l-scroll>
      </div>
    </l-aside>
    <l-container>
      <l-header class="doc-header-wapper">
        <doc-header></doc-header>
      </l-header>
      <l-main class="doc-main-wapper">
        <l-scroll  ref="mainScrollbarRef" class="doc-sroll-main-height" :native="true" trigger="none" direction="y">
          <div class="doc-content">
            <div class="doc-content-document">
              <router-view />
            </div>
          </div>
        </l-scroll>
      </l-main>
    </l-container>
  </l-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/sites/pc/components/header.vue';
import Nav from '@/sites/pc/components/nav.vue';
import logo from '../../../assets/images/logo.jpeg'


export default defineComponent({
  name: 'Index',
  components: {
    [Header.name]: Header,
    [Nav.name]: Nav
  },
  setup() {
    return {
      logo
    }
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