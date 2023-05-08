<template>
  <div class="doc-nav">
    <ol v-for="_nav in nav" :key="_nav">
      <li>{{ _nav.name }}</li>
      <ul>
        <template v-for="_package in _nav.children" :key="_package">
          <li v-if="_package.show">
            <router-link
              :to="_package.path"
              :class="{
                active: isActive(_package.name),
                planned: _package.progress == '0%' || !_package.component
              }"
            >
              {{ _package.cName }}&nbsp;&nbsp;
              <b v-if="!_package.path.includes('guide')">
                {{ _package.name.replace(/-/g, '') }}
                <i>({{ _package.progress }})</i>
              </b>
            </router-link>
          </li>
        </template>
      </ul>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue';
import { RefData } from '../../assets/utils/ref';
import { guideNav, componentsNavs } from '../router';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'doc-nav',
  props: {
    seat: {
      type: String,
      default: 'left'
    }
  },
  setup(props, {}) {
    const isActive = computed(() => {
      return function (name: string) {
        const currentValue = RefData.getInstance().currentRoute.value;
        return currentValue == name.toLowerCase();
      };
    });
    const { seat } = toRefs(props);
    const route = useRoute();
    const nav = computed(() => {
      const { path } = route;
      return path.includes('guide') ? guideNav : path.includes('components') ? componentsNavs : [];
    });
    return {
      isActive,
      seat,
      nav,
      currentRoute: RefData.getInstance().currentRoute
    };
  }
});
</script>


<style scoped lang="scss">
.right-title {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 28px;
  font-size: 18px;
  color: #29c1c2;
  text-align: center;
}
.navRightAdd {
  padding-left: 0 !important;
  padding-right: 10px;
  ul li a.router-link-active,
  .doc-nav ol > ul li a.active {
    border-right: none !important;
    border-left: 3px solid #29c1c2;
  }
  .liRightAdd {
    padding-left: 20px;
  }
}
</style>
