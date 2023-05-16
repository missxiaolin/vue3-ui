<template>
  <div :class="wrapperClassName">
    <a
      :class="titleClassName"
      :href="href"
      :title="typeof title === 'string' ? title : ''"
      :target="target"
      @click="handleClick"
      onclick="return false;"
      >{{ title }}</a
    >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useNamespace } from '../../../hooks';
import { anchorLinkProps, anchorLinkEmits } from './anchor-link';
import createComponent from '../../../utils/create';
import classNames from '../../../utils/classNames';
const { create } = createComponent('AnchorLink');
import { useInjectAnchor } from './context';

export default create({
  props: anchorLinkProps,
  emits: anchorLinkEmits,
  setup(props, {}) {
    let mergedTitle = null;
    const { href } = props;
    const ns = useNamespace('anchor');
    const pre = ns.b('link');
    const { handleClick: contextHandleClick, scrollTo, unregisterLink, registerLink, activeLink } = useInjectAnchor();

    const handleClick = (e: Event) => {
      // contextHandleClick(e, { title: mergedTitle, href });
      scrollTo(href);
    };

    const active = activeLink.value === href;

    const wrapperClassName = ref(
      classNames(`${pre}`, {
        [`${pre}-active`]: active
      })
    );

    const titleClassName = ref(
      classNames(`${pre}-title`, {
        [`${pre}-title-active`]: active
      })
    );

    watch(
      () => props.href,
      (val, oldVal) => {
        console.log('hrefChange=>>', val, oldVal);
        nextTick(() => {
          unregisterLink(oldVal);
          registerLink(val);
        });
      }
    );

    watch(
      () => activeLink.value,
      (val, oldVal) => {
        const active = val === href;

        wrapperClassName.value = classNames(`${pre}`, {
          [`${pre}-active`]: active
        });

        titleClassName.value = classNames(`${pre}-title`, {
          [`${pre}-title-active`]: active
        });
      }
    );

    onMounted(() => {
      registerLink(props.href);
    });

    onBeforeUnmount(() => {
      unregisterLink(props.href);
    });

    return {
      ns,
      wrapperClassName,
      titleClassName,
      handleClick
    };
  }
});
</script>
