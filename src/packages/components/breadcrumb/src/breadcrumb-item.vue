<template>
  <span :class="['l-breadcrumb__item']">
    <span
      ref="link"
      :class="[
        'l-breadcrumb__inner',
        {
          'is-link': !!to
        }
      ]"
      role="link"
      @click="onClick"
    >
      <slot />
    </span>
    <l-icon v-if="separatorIcon" :class="['l-breadcrumb__separator']" :icon="separatorIcon"></l-icon>
  </span>
</template>

<script lang="ts">
import { inject, getCurrentInstance } from 'vue';
import { Icon } from '../../icon/index';
import { breadcrumbKey } from '../../../tokens/breadcrumb';
import { breadcrumbItemProps } from './breadcrumb-item';
import type { Router } from 'vue-router';
import type { BreadcrumbProps } from './breadcrumb';

import createComponent from '../../../utils/create';
const { create, componentName } = createComponent('BreadcrumbItem');

export default create({
  components: {
    Icon
  },
  props: breadcrumbItemProps,
  directives: {},
  emits: ['click'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()!;
    const router = instance.appContext.config.globalProperties.$router as Router;
    const breadcrumbInjection = inject(breadcrumbKey, {} as BreadcrumbProps)!;
    const { separatorIcon } = breadcrumbInjection;

    const handleClick = (event: MouseEvent) => {
      emit('click', event);
      if (!props.to || !router) return;
      props.replace ? router.replace(props.to) : router.push(props.to);
    };
    return {
      componentName,
      separatorIcon,
      handleClick
    };
  }
});
</script>
