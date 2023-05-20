<template>
  <div :class="[ns.b()]">
    <slot></slot>
    <transition name="l-zoom-in-center">
      <span v-show="!hidden && (content || content === '0' || isDot)" class="l-badge__content" :class="[
        'l-badge__content--' + type,
        {
          'is-fixed': $slots.default,
          'is-dot': isDot,
          'is-tag': isTag
        }
      ]"
      v-text="content"> </span>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { badgeProps } from './badge';
import { useNamespace } from '../../../hooks';

const { create } = createComponent('Badge');

export default create({
  props: badgeProps,
  setup(props) {
    const ns = useNamespace('badge');
    const { isDot, value, max, hidden, isTag } = toRefs(props);
    const content = computed<string>(() => {
      if (props.isDot) return '';

      if (typeof props.value === 'number' && typeof props.max === 'number') {
        return props.max < props.value ? `${props.max}+` : `${props.value}`;
      }
      return `${props.value}`;
    });

    return {
      ns,
      content,
      hidden,
      isDot,
      isTag,
      value,
      max
    };
  }
});
</script>
