<template>
  <transition :name="`${ns.namespace.value}-fade-in`">
    <div ref="root" :class="ns.b()">
      <div
        v-if="visible"
        :style="{
          right: styleRight,
          bottom: styleBottom
        }"
        :class="ns.e('fixed')"
        @click.stop="handleClick"
      >
        <slot>
          <l-icon :class="ns.e('icon')" class="l-huidaodingbu"></l-icon>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue';
import { useEventListener, useThrottleFn } from '@vueuse/core';
import { Icon } from '../../../components/icon';
import { throwError } from '../../..//utils/error';
import { useNamespace } from '../../..//hooks';

import { backtopEmits, backtopProps } from './backtop';
import { getScrollContainer } from '../../../utils/dom';

import createComponent from '../../../utils/create';
// import { constant } from '_@types_lodash@4.14.178@@types/lodash';
const { componentName, create } = createComponent('Backtop');

export default create({
  components: {
    Icon
  },
  props: backtopProps,
  emits: backtopEmits,
  setup(props, { emit }) {
    const ns = useNamespace('backtop');
    const root = shallowRef<HTMLDivElement>();
    const el = shallowRef<HTMLElement | undefined>(document.documentElement);
    const scrollContainer = shallowRef<HTMLElement | Window>(); // (getScrollContainer(root.value!, true) || document)
    const visible = ref(false);
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);
    const scrollTop = ref(0);
    const scrollToTop = () => {
      if (!el.value) return;
      // const beginTime = Date.now()
      // const beginValue = el.value.scrollTop
      const frameFunc = () => {
        // if (!el.value) return
        // const progress = (Date.now() - beginTime) / 500
        // if (progress < 1) {
        //   el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress))
        //   requestAnimationFrame(frameFunc)
        // } else {
        //   scrollContainer.value.scrollTop = 0
        // }
        scrollContainer.value.scrollTop = 0;
      };
      requestAnimationFrame(frameFunc);
    };
    const handleScroll = () => {
      scrollTop.value =
        scrollContainer.value instanceof Window
          ? document.documentElement.scrollTop
          : scrollContainer.value.scrollTop || 0;
      if (el.value) {
        visible.value = scrollTop.value >= props.visibilityHeight;
      }
    };
    const handleClick = (event: MouseEvent) => {
      scrollToTop();
      emit('click', event);
    };

    const handleScrollThrottled = useThrottleFn(handleScroll, 300);

    onMounted(() => {
      if (props.target) {
        el.value = document.querySelector<HTMLElement>(props.target) ?? undefined;
        if (!el.value) {
          throwError(componentName, `target is not existed: ${props.target}`);
        }
        scrollContainer.value = el.value;
      }
      scrollContainer.value = getScrollContainer(root.value!, true);
    });
    useEventListener(scrollContainer, 'scroll', handleScrollThrottled);

    return {
      ns,
      root,
      visible,
      styleRight,
      styleBottom,
      handleClick
    };
  }
});
</script>
