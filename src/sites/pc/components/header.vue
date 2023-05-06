<template>
  <div class="doc-header" :class="themeName()">
    <div class="header-nav">
      <Search />
      <div class="nav-box">
        <ul class="nav-list">
          <li class="nav-item" v-for="item in header" :key="item.name" :class="{ active: isActive(item.name) }">
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
import { useRoute } from 'vue-router';
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

    const route = useRoute();

    const isActive = computed(() => {
      return function (name: string) {
        const { path } = route;
        return path.includes(name);
      };
    });

    return {
      header,
      themeName,
      isActive
    };
  }
});
</script>

<style lang="scss" scoped>
</style>