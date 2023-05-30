<template>
  <div ref="root" v-if="!affix" :class="[ns.b(), wrapperClass]" :style="wrapperStyle" :ref="anchorRef">
    <transition
      :name="`${ns.b()}-fade`"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div :class="[`${ns.b()}_content`, anchorClass, 'ltr']" v-show="visible">
        <div :class="[`${ns.b()}-ink`]">
          <span :ref="inkNodeRef" />
        </div>
        <slot></slot>
      </div>
    </transition>
    <div :class="`${ns.b()}__bar`" @click="visible = !visible">
      <l-icon icon="l-youbian"></l-icon>
    </div>
  </div>
  <l-sticky v-else :offset="props.offsetTop">
    <div ref="root" :class="[ns.b(), wrapperClass]" :style="wrapperStyle" :ref="anchorRef">
      <transition
        :name="`${ns.b()}-fade`"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
        @before-leave="beforeLeave"
      >
        <div :class="[`${ns.b()}_content`, anchorClass, 'ltr']" v-show="visible">
          <div :class="[`${ns.b()}-ink`]">
            <span :ref="inkNodeRef" />
          </div>
          <slot></slot>
        </div>
      </transition>
      <div :class="`${ns.b()}__bar`" @click="visible = !visible">
        <l-icon :icon="visible ? 'l-youbian' : 'l-zuobian'"></l-icon>
      </div>
    </div>
  </l-sticky>
</template>

<script lang="ts">
import { toRefs, ref, h, reactive, onMounted, shallowRef, nextTick, computed } from 'vue';
import { useEventListener, useThrottleFn } from '@vueuse/core';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { anchorProps, anchorEmits } from './anchor';
import useProvideAnchor from './context';
import { Icon } from '../../icon';
import { Sticky } from '../../sticky';
import { throwError } from '../../../utils/error';
import { getScrollContainer } from '../../../utils/dom';

const { create, componentName } = createComponent('Anchor');
const sharpMatcherRegx = /#([\S ]+)$/;
type Section = {
  link: string;
  top: number;
};
type AnchorContainer = HTMLElement | Window | null;
export interface AnchorState {
  scrollContainer: AnchorContainer;
  links: string[];
  scrollEvent: any;
  animating: boolean;
}

export default create({
  components: {
    Sticky,
    Icon
  },
  props: anchorProps,
  emits: anchorEmits,
  setup(props, { emit, attrs, expose }) {
    const { affix, wrapperClass, wrapperStyle, showInkInFixed } = props;
    const ns = useNamespace('anchor');
    const root = shallowRef<HTMLDivElement>();

    const el = shallowRef<HTMLElement | undefined>(document.documentElement);
    const scrollContainer = shallowRef<AnchorContainer>(); // (getScrollContainer(root.value!, true) || document)

    const anchorRef = ref();
    const inkNodeRef = ref();

    const state = reactive<AnchorState>({
      links: [],
      scrollContainer: null,
      scrollEvent: null,
      animating: false
    });

    const activeLink = ref<string | null>(null);

    const visible = ref(true);

    // 固定模式是否显示圆点
    const anchorClass = { ['']: !affix && !showInkInFixed };

    const afterEnter = () => {};
    const afterLeave = () => {};
    const beforeLeave = () => {};

    const getCurrentAnchor = (offset = 0, bounds = 5) => {
      const linkSections: Array<Section> = [];
      const container = scrollContainer.value as HTMLElement;
      state.links.forEach((link) => {
        const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
        if (!sharpLinkMatch) {
          return;
        }
        const target = document.getElementById(sharpLinkMatch[1]);
        if (target) {
          const top = getOffsetTop(target, container);
          if (top < offset + bounds + container.scrollTop) {
            linkSections.push({
              link,
              top
            });
          }
        }
      });

      if (linkSections.length) {
        const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
        return maxSection.link;
      }
      return '';
    };
    function getOffsetTop(element: HTMLElement, container: any): number {
      if (!element.getClientRects().length) {
        return 0;
      }
      if (!container) {
        return element.offsetTop;
      }
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // 获取距离父容器的高度
      const { scrollTop } = container;
      return rect.top + scrollTop - containerRect.top;
      // const rect = element.getBoundingClientRect();
      // if (rect.width || rect.height) {
      //   if (container === window) {
      //     container = element.ownerDocument!.documentElement!;
      //     return rect.top - container.clientTop;
      //   }
      //   return rect.top - (container as HTMLElement).getBoundingClientRect().top;
      // }

      // return rect.top;
    }

    const setCurrentActiveLink = (link: string) => {
      if (activeLink.value === link) {
        return;
      }

      activeLink.value = link;
      emit('change', link);
    };
    const scrollToTop = (link: string) => {
      const { offsetTop, targetOffset } = props;
      const container: HTMLElement = scrollContainer.value! as HTMLElement;
      const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      const frameFunc = () => {
        container.scrollTop = y;
      };
      requestAnimationFrame(frameFunc);
    };

    const handleScrollTo = (link: string) => {
      scrollToTop(link);
      // 如果区域不可滚动或者滚动行为不是smooth 手动设置当前link
      const { scrollHeight, clientHeight } = scrollContainer.value as HTMLElement;
      const scrollBehavior = getComputedStyle(scrollContainer.value as Element).scrollBehavior;
      if (scrollHeight === clientHeight || scrollBehavior !== 'smooth') {
        setCurrentActiveLink(link);
      }
      // setCurrentActiveLink(link); TODO 待确认不触发主动选中，滚动结束自动选中
    };
    expose({
      scrollTo: handleScrollTo
    });

    useProvideAnchor({
      registerLink: (link: string) => {
        if (!state.links.includes(link)) {
          state.links.push(link);
        }
      },
      unregisterLink: (link: string) => {
        const index = state.links.indexOf(link);
        if (index !== -1) {
          state.links.splice(index, 1);
        }
      },
      activeLink,
      scrollTo: handleScrollTo,
      handleClick: (e, info) => {
        emit('click', e, info);
      }
    });
    const anchorDefault = computed(() => {
      return props.defaultAnchor?.charAt(0) !== '#' ? `#${props.defaultAnchor}` : props.defaultAnchor;
    });

    const handleScroll = () => {
      if (state.animating) {
        return;
      }
      // 若滚动条滚动到底不更新
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value as HTMLElement;
      if (scrollTop + clientHeight === scrollHeight && scrollTop > 0) {
        return;
      }
      const { bounds, targetOffset } = props;
      const currentActiveLink = getCurrentAnchor(targetOffset !== undefined ? targetOffset : 0, bounds);
      setCurrentActiveLink(currentActiveLink || anchorDefault.value);
    };
    const handleScrollThrottled = useThrottleFn(handleScroll, 200);

    onMounted(() => {
      nextTick(() => {
        if (props.target) {
          el.value = document.querySelector<HTMLElement>(props.target) ?? undefined;
          if (!el.value) {
            throwError(componentName, `target is not existed: ${props.target}`);
          }
          scrollContainer.value = el.value;
        }
        if (!scrollContainer.value) {
          scrollContainer.value = getScrollContainer(root.value!, true);
        }
        handleScroll();
      });
    });

    useEventListener(scrollContainer, 'scroll', handleScrollThrottled);

    return {
      root,
      ns,
      affix,
      props,
      wrapperClass,
      wrapperStyle,
      anchorRef,
      inkNodeRef,
      anchorClass,
      visible,
      afterEnter,
      afterLeave,
      beforeLeave
    };
  }
});
</script>
