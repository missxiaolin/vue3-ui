<template>
  <div class="doc-header" :class="themeName()">
    <div class="header-nav">
      <Search />
      <div class="nav-box">
        <ul class="nav-list">
          <li class="nav-item" v-for="item in header" :key="item.name">
            <a :href="item.path">
              {{ item.cName }}
            </a>
          </li>
          <li class="nav-item">
            <div class="header-select-box">
              <div class="header-select-hd">1.0.0<i class=""></i></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { RefData } from '../../assets/utils/ref'
import config from '../../../config';
import Search from './Search.vue';

export default defineComponent({
  name: 'doc-header',
  components: {
    Search
  },
  setup() {
    let header = ref<any>(config.header)
    const themeName = computed(() => {
      return function () {
        return `doc-header-${RefData.getInstance().themeColor.value}`;
      };
    });

    return {
      header,
      themeName
    };
  }
});
</script>

<style lang="scss">
@import '../../assets/style/header.scss';
</style>