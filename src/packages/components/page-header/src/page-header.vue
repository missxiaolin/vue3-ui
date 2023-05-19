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
            <slot name="title">{{ title || '返回' }}</slot>
          </div>
        </div>
        <Divider direction="vertical" />
        <div :class="ns.e('content')">
          <slot name="content">{{ content || '详情页面' }}</slot>
        </div>
      </div>
    </div>

    <div v-if="$slots.main" :class="ns.e('main')">
      <slot name="main" />
    </div>
  </div>
</template>

<script lang="ts">
import { PageHeaderProps, pageHeaderEmits } from './page-header';
import { toRefs, computed, useSlots } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { componentName, create } = createComponent('PageHeader');
import { Icon } from '../../icon/index';
import { Divider } from '../../divider/index';

export default create({
  components: {
    Icon,
    Divider
  },
  props: PageHeaderProps,
  emits: pageHeaderEmits,
  setup(props, { emit }) {
    const ns = useNamespace('page-header');
    const { icon, title, content } = toRefs(props);
    const slots = useSlots()

    const kls = computed(() => {
      return [
        ns.b(),
        {
          [ns.m('has-breadcrumb')]: !!slots.breadcrumb,
          [ns.is('contentful')]: !!slots.main
        }
      ];
    });

    const handleClick = () => {
      emit('back');
    };

    return {
      componentName,
      ns,
      kls,
      handleClick,
      icon,
      title,
      content
    };
  }
});
</script>
