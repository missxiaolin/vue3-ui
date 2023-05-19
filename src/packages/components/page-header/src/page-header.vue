<template>
  <div :class="kls">
    <div v-if="$slots.breadcrumb" :class="ns.e('breadcrumb')">
      <slot name="breadcrumb" />
    </div>
    <div :class="ns.e('header')">
      <div :class="ns.e('left')">
        <div :class="ns.e('back')" role="button" tabindex="0" @click="handleClick">
          <div v-if="icon" :class="ns.e('icon')"> 
            <icon :icon="icon"></icon>
          </div>
          <div :class="ns.e('title')">
            <slot name="title">返回</slot>
          </div>
        </div>
        <div :class="ns.e('content')">
          <slot name="content">详情页面</slot>
        </div>
      </div>
    </div>

    <div v-if="$slots.default" :class="ns.e('main')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { PageHeaderProps, pageHeaderEmits } from './page-header';
import { toRefs, ref, watch, onMounted, computed } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { componentName, create } = createComponent('PageHeader');
import { Icon } from '../../icon/index';

export default create({
  components: {
    Icon
  },
  props: PageHeaderProps,
  emits: pageHeaderEmits,
  setup(props, { emit }) {
    const ns = useNamespace('page-header');
    const { icon } = toRefs(props);

    const kls = computed(() => {
      return [ns.b()];
    });

    const handleClick = () => {
      console.log('点击');
    };

    return {
      componentName,
      ns,
      kls,
      handleClick,
      icon
    };
  }
});
</script>
