<template>
  <div
    :class="[`l-scrollbar l-scrollbar-${trigger}`, native ? '' : 'el-scrollbar__wrap--hidden-default']"
    :style="scrollStyle"
    ref="scrollbar"
  >
    <div
      :class="{ 'l-scrollbar-wrap': true, [`l-scrollbar-wrap-${direction}`]: true }"
      :id="scrollId"
      ref="wrapRef"
      :style="scrollWrapStyle"
      @scroll="handleScroll"
    >
      <div ref="scrollBarContent" :class="['l-scrollbar-content', viewClass]" :style="viewStyle">
        <slot />
      </div>
      <template v-if="!native">
        <Bar
          direction="vertical"
          :parentRef="wrapRef"
          :size="vThumbHeight"
          :move="moveY"
          :barStyle="vBarStyle"
          :thumbStyle="vThumbStyle"
          v-show="hasVBar"
          class="l-scrollbar-bar-v-bar"
          v-if="direction !== 'x'"
        ></Bar>

        <Bar
          direction="horizontal"
          :parentRef="wrapRef"
          :size="hThumbWidth"
          :move="moveX"
          :barStyle="hBarStyle"
          :thumbStyle="hThumbStyle"
          v-show="hasHBar"
          class="l-scrollbar-bar-h-bar"
          v-if="direction !== 'y'"
        ></Bar>
      </template>
      <div class="l-scrollbar-loading" v-show="scrollLoading">
        <l-icon icon="l-loading" size="16"></l-icon>加载中...
      </div>
      <div class="l-scrollbar-bottom-line" v-show="finished && hasLoad && !scrollLoading">
        <p class="l-scrollbar-bottom-text">{{ finishedText }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, reactive, ref, toRefs, toRaw, computed } from 'vue';
import { addUnit } from '../../../utils/util';
import type { StyleValue, CSSProperties } from 'vue';
import { addResizeListener, removeResizeListener } from '../plugins/resize-event';
import createComponent from '../../../utils/create';
import { ScrollProps } from './scroll';
import Bar from '../plugins/bar.vue';

const { componentName, create } = createComponent('Scroll');

export default create({
  components: {
    Bar
  },
  props: ScrollProps,
  setup(props: any, { emit, attrs }: any) {
    const wrapRef = ref();
    const hasLoad = Object.prototype.toString.call(toRaw(attrs.onLoad)) === '[object Function]' && props.canOnLoad;
    const scrollbar = ref();
    const scrollBarContent = ref(); // 滚动内容区域
    let scrollLoading = ref(false); // 滚动加载状态
    let beforeScrollTop = ref(0); // 记录之前滚动值 计算滚动方向
    let scrollStyle = ref();
    const state = reactive({
      vThumbHeight: '0',
      hThumbWidth: '0',
      moveX: '0%',
      moveY: '0%',
      hover: false
    });

    /**
     * 加载中状态变更
     */
    const resetLoadingStatus = () => {
      setTimeout(() => {
        scrollLoading.value = false;
      }, 1000);
    };
    /**
     * 上拉加载触发
     */
    const triggerScroll = (event: Event) => {
      console.log(' scrollTop, clientHeight---', event);

      emit('scroll', event, {});
    };
    /**
     * 真实滚动条滚动时，修改滚动条bar移动距离
     */
    const handleScroll = (event: Event) => {
      if (!wrapRef.value) return;
      const { scrollTop, clientHeight, scrollLeft, clientWidth }: any = wrapRef.value;
      const contentHeight = scrollBarContent.value.clientHeight;
      state.moveY = `${(scrollTop * 100) / clientHeight}%`;
      state.moveX = `${(scrollLeft * 100) / clientWidth}%`;
      // throttle(triggerScroll, 2000);
      emit('scroll', event, { scrollTop, scrollLeft });
      const delta = scrollTop - beforeScrollTop.value;
      if (delta === 0 || scrollLoading.value) return false;
      const direction = delta > 0 ? 'down' : 'up';
      const isLoadDistance = contentHeight - (scrollTop + clientHeight) <= props.offset;
      if (isLoadDistance && direction == 'down' && !scrollLoading.value && !props.finished && hasLoad) {
        scrollLoading.value = true;
        emit('load', resetLoadingStatus);
      }
      beforeScrollTop.value = scrollTop;
    };
    const getStyle = function (dom: any, attr: any) {
      return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
    };
    const resetScrollStyle = () => {
      const style: CSSProperties = {
        width: addUnit(props.width || ''),
        height: addUnit(props.height || ''),
        'max-height': addUnit(props.maxHeight || ''),
        'max-width': addUnit(props.maxWidth || '')
      };
      scrollStyle.value = [props.wrapStyle, style];
    };
    /**
     * 更新thumb的宽高 外层容器高度 / 整个内容的高度（整个可滚动内容区域） =  滚动条thumb的高度 / 滚动轨道的高度（一般滚动轨道的高度与外层容器相等）
     */
    const hasVBar = ref(false);
    const hasHBar = ref(false);
    function update() {
      if (wrapRef.value) {
        const heightPercentage = (wrapRef.value.clientHeight * 100) / wrapRef.value.scrollHeight;
        const widthPercentage = (wrapRef.value.clientWidth * 100) / wrapRef.value.scrollWidth;

        if (heightPercentage < 100) {
          hasVBar.value = true;
        } else {
          hasVBar.value = false;
        }

        if (widthPercentage < 100) {
          hasHBar.value = true;
        } else {
          hasHBar.value = false;
        }
        state.vThumbHeight = heightPercentage < 100 ? `${heightPercentage}%` : '';
        state.hThumbWidth = widthPercentage < 100 ? `${widthPercentage}%` : '';
      }
    }

    function setScrollTop(value: number) {
      wrapRef.value.scrollTop = value;
    }

    function setScrollLeft(value: number) {
      wrapRef.value.scrollLeft = value;
    }

    onMounted(() => {
      update(); // 初始化调用一次，计算滚动条默认高度
      if (!props.noresize) {
        addResizeListener(wrapRef.value, update); // 监听元素变化，如果容器DOM变化触发更新
      }
      resetScrollStyle();
    });

    onUnmounted(() => {
      if (!props.noresize) {
        removeResizeListener(wrapRef.value, update);
      }
    });
    const scrollWrapStyle = computed(() => {
      return {
        'max-height': props.maxHeight,
        'max-width': props.maxWidth,
        ...props.scrollWrapStyle
      };
    });

    return {
      ...toRefs(state),
      componentName,
      wrapRef,
      scrollbar,
      scrollBarContent,
      scrollStyle,
      handleScroll,
      hasVBar,
      hasHBar,
      setScrollTop,
      setScrollLeft,
      beforeScrollTop,
      scrollLoading,
      hasLoad,
      scrollWrapStyle
    };
  }
});
</script>
