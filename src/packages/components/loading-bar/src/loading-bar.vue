<template>
  <teleport :to="to ?? 'body'">
    <transition
      name="l-loading-bar-fade"
      appear
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
      :css="!transitionDisabledRef"
    >
      <div class="l-loading-bar-container">
        <div
          ref="loadingBarRef"
          :class="[
            ns.b(),
            {
              'l-loading-bar__starting': isStart,
              'l-loading-bar__error': isError,
              'l-loading-bar__finishing': isFinish
            }
          ]"
          :style="mergedLoadingBarStyle"
        >
        </div>
      </div>
    </transition>
  </teleport>
  <slot></slot>
</template>

<script lang="ts">
import { toRefs, ref, nextTick, provide, computed, onMounted } from 'vue';
import { useNamespace } from '../../../hooks';
import { loadingBarProps, loadingBarEmits, loadingBarInjectionKey } from './loading-bar';
import createComponent from '../../../utils/create';
import { useMounted } from '@vueuse/core';
import type { LoadingBarApi } from './loading-bar';

const { create, componentName } = createComponent('LoadingBar');

export default create({
  components: {},
  props: loadingBarProps,
  emits: loadingBarEmits,
  setup(props) {
    const ns = useNamespace('loading-bar');
    const { loadingBarStyle, to } = toRefs(props);
    const loadingBarRef = ref<HTMLElement | null>(null);
    const isMounted = useMounted();
    const isStart = ref(false); // 是否开启
    const isEnter = ref(false); // 动画是否开启
    const isError = ref(false); // 是否报错
    const isLoading = ref(false); // 是否在loading
    const isFinish = ref(false); // 判断是否已完成
    const transitionDisabledRef = ref(false);
    const mergedLoadingBarStyle = computed(() => {
      // 传入的样式
      if (!loadingBarStyle?.value) return '';
      return loadingBarStyle.value[isError.value ? 'error' : 'loading'];
    });
    // 初始化
    async function init() {
      isStart.value = false;
      isEnter.value = false;
      isError.value = false;
      isLoading.value = false;
      isFinish.value = false;
      transitionDisabledRef.value = true;
      await nextTick();
      transitionDisabledRef.value = false;
    }
    // 开启loading
    async function handleStart(fromProgress = 0, toProgress = 90, type = ''): Promise<void> {
      await init();
      isLoading.value = true;
      type === 'error' ? (isError.value = true) : (isStart.value = true);
      await nextTick();
      const el = loadingBarRef.value;
      if (!el) return;
      el.style.maxWidth = `${fromProgress}%`;
      el.style.transition = 'none';
      void el.offsetWidth; // 触发浏览器重绘
      el.style.transition = '';
      el.style.maxWidth = `${toProgress}%`;
    }
    // 结束loading
    async function handleFinish(): Promise<void> {
      if (isFinish.value || isError.value || !isLoading.value) return;
      const el = loadingBarRef.value;
      if (!el) return;
      isFinish.value = true;
      await nextTick();
      el.style.maxWidth = '100%';
      void el.offsetWidth;
      isLoading.value = false;
    }
    // 报错
    async function handleError(): Promise<void> {
      if (isError.value) return;
      if (!isLoading.value) {
        void handleStart(100, 100, 'error').then(() => {
          const el = loadingBarRef.value;
          if (!el) return;
          void el.offsetWidth;
          isLoading.value = false;
        });
      } else {
        isError.value = true;
        await nextTick();
        const el = loadingBarRef.value;
        if (!el) return;
        el.style.maxWidth = '100%';
        void el.offsetWidth;
        isLoading.value = false;
      }
    }
    function handleEnter(): void {
      isEnter.value = true;
    }
    function handleAfterEnter(): void {
      isEnter.value = false;
    }
    async function handleAfterLeave(): Promise<void> {
      isStart.value = false;
      isEnter.value = false;
      isError.value = false;
      isLoading.value = false;
    }
    const methods: LoadingBarApi = {
      start() {
        if (isMounted.value) {
          handleStart();
        } else {
          void nextTick(() => [handleStart()]);
        }
      },
      error() {
        if (isMounted.value) {
          handleError();
        } else {
          void nextTick(() => [handleError()]);
        }
      },
      finish() {
        if (isMounted.value) {
          handleFinish();
        } else {
          void nextTick(() => [handleFinish()]);
        }
      }
    };
    provide(loadingBarInjectionKey, methods);
    return {
      componentName,
      ns,
      to,
      mergedLoadingBarStyle,
      loadingBarRef,
      isStart,
      isEnter,
      isError,
      isFinish,
      isLoading,
      transitionDisabledRef,
      handleStart,
      handleError,
      handleFinish,
      handleEnter,
      handleAfterEnter,
      handleAfterLeave
    };
  }
});
</script>
