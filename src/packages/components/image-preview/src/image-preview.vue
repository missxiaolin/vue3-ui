<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="viewer-fade" appear>
      <div
        :ref="setHelloRef"
        :tabindex="-1"
        :class="ns.e('wrapper')"
        :style="[{ zIndex: computedZIndex }, wrapperStyle]"
      >
        <div :class="ns.e('mask')" v-if="modal" @click.self="hideOnClickModal && hide()" />

        <!-- CLOSE -->
        <span :class="[ns.e('btn'), ns.e('close')]" v-if="showClose" @click="hide">
          <icon icon="l-guanbi1"></icon>
        </span>

        <!-- ARROW -->
        <template v-if="!isSingle">
          <span :class="[ns.e('btn'), ns.e('prev'), ns.is('disabled', !infinite && isFirst)]" @click="prev">
            <icon icon="l-zuobian"></icon>
          </span>
          <span :class="[ns.e('btn'), ns.e('next'), ns.is('disabled', !infinite && isLast)]" @click="next">
            <icon icon="l-youbian"></icon>
          </span>
        </template>
        <!-- ACTIONS -->
        <div :class="[ns.e('btn'), ns.e('actions')]">
          <div :class="ns.e('actions__inner')">
            <icon icon="l-suoxiao2" @click="handleActions('zoomOut')"></icon>
            <icon icon="l-sousuofangda" @click="handleActions('zoomIn')"></icon>
            <i :class="ns.e('actions__divider')"></i>
            <icon @click="toggleMode" :icon="mode.icon"></icon>
            <i :class="ns.e('actions__divider')"></i>
            <icon icon="l-xiangzuoxuanzhuan" @click="handleActions('anticlockwise')"></icon>
            <icon icon="l-xiangyouxuanzhuan" @click="handleActions('clockwise')"></icon>
          </div>
        </div>
        <!-- CANVAS -->
        <div :class="ns.e('canvas')">
          <img
            v-for="(url, i) in urlList"
            v-show="i === index"
            :ref="(el) => (imgRefs[i] = el)"
            :key="url"
            :src="url"
            :style="imgStyle"
            :class="ns.e('img')"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </div>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  nextTick,
  effectScope,
  ComponentPublicInstance,
  HTMLAttributes
} from 'vue';
import { useEventListener, isNumber } from '@vueuse/core';
import { throttle } from 'lodash';
import { Icon } from '../../../components/icon';
import { useLocaleInject, useNamespace, useZIndex, useLockscreen } from '../../../hooks';

import { EVENT_CODE } from '../../../utils/aria';
import { isFirefox } from '../../..//utils/util';
import { imageViewerProps, imageViewerEmits } from './image-preview';
import { objTy } from '../../../utils/types';
import type { CSSProperties } from 'vue';

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'l-fangda'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'l-suoxiao1'
  }
};

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';
export type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise';

import createComponent from '../../../utils/create';
const { create } = createComponent('ImagePreview');

export default create({
  components: {
    Icon
  },
  props: imageViewerProps,
  emits: imageViewerEmits,

  setup(props, { emit }) {
    const { t } = useLocaleInject();
    const ns = useNamespace('image-viewer');
    const { nextZIndex } = useZIndex();
    const wrapper = ref<HTMLDivElement>();
    const imgRefs = ref<any[]>([]);

    const scopeEventListener = effectScope();

    const loading = ref(true);
    const index = ref(props.initialIndex);
    const mode = ref(Mode.CONTAIN);
    const transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });

    const setHelloRef = (el: HTMLDivElement | HTMLElement | ComponentPublicInstance | HTMLAttributes) => {
      wrapper.value = el;
    };
    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });

    const isFirst = computed(() => {
      return index.value === 0;
    });

    const isLast = computed(() => {
      return index.value === props.urlList.length - 1;
    });

    const currentImg = computed(() => {
      return props.urlList[index.value];
    });

    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;

      switch (deg % 360) {
        case 90:
        case -270:
          [translateX, translateY] = [translateY, -translateX];
          break;
        case 180:
        case -180:
          [translateX, translateY] = [-translateX, -translateY];
          break;
        case 270:
        case -90:
          [translateX, translateY] = [-translateY, translateX];
          break;
      }

      const style: CSSProperties = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? 'transform .3s' : ''
      };
      if (mode.value.name === Mode.CONTAIN.name) {
        style.maxWidth = style.maxHeight = '100%';
      }
      return style;
    });

    const computedZIndex = computed(() => {
      return isNumber(props.zIndex) ? props.zIndex : nextZIndex();
    });

    function hide() {
      unregisterEventListener();
      emit('close');
    }

    function registerEventListener() {
      const keydownHandler = throttle((e: KeyboardEvent) => {
        switch (e.code) {
          // ESC
          case EVENT_CODE.esc:
            hide();
            break;
          // SPACE
          case EVENT_CODE.space:
            toggleMode();
            break;
          // LEFT_ARROW
          case EVENT_CODE.left:
            prev();
            break;
          // UP_ARROW
          case EVENT_CODE.up:
            handleActions('zoomIn');
            break;
          // RIGHT_ARROW
          case EVENT_CODE.right:
            next();
            break;
          // DOWN_ARROW
          case EVENT_CODE.down:
            handleActions('zoomOut');
            break;
        }
      });
      const mousewheelHandler = throttle((e: WheelEvent | any /* TODO: wheelDelta is deprecated */) => {
        const { left = 0, top = 0, right = 0, bottom = 0 }: any = wrapper.value?.getBoundingClientRect?.();
        if (!(e.x >= left && e.x <= right && e.y >= top && e.y <= bottom)) return;
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          handleActions('zoomIn', {
            zoomRate: 1.2,
            enableTransition: false
          });
        } else {
          handleActions('zoomOut', {
            zoomRate: 1.2,
            enableTransition: false
          });
        }
      });

      scopeEventListener.run(() => {
        useEventListener(document, 'keydown', keydownHandler);
        useEventListener(document, mousewheelEventName, mousewheelHandler);
      });
    }

    function unregisterEventListener() {
      // useLockscreen(loading)
      scopeEventListener.stop();
    }

    function handleImgLoad() {
      loading.value = false;
    }

    function handleImgError(e: Event) {
      loading.value = false;
      (e.target as HTMLImageElement).alt = t('el.image.error');
    }

    function handleMouseDown(e: MouseEvent) {
      if (loading.value || e.button !== 0 || !wrapper.value) return;
      transform.value.enableTransition = false;

      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;

      const dragHandler = throttle((ev: MouseEvent) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        };
      });
      const removeMousemove = useEventListener(document, 'mousemove', dragHandler);
      useEventListener(document, 'mouseup', () => {
        removeMousemove();
      });

      e.preventDefault();
    }

    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }

    function toggleMode() {
      if (loading.value) return;

      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = Mode[modeNames[nextIndex]];
      reset();
    }

    function prev() {
      if (isFirst.value && !props.infinite) return;
      const len = props.urlList.length;
      index.value = (index.value - 1 + len) % len;
    }

    function next() {
      if (isLast.value && !props.infinite) return;
      const len = props.urlList.length;
      index.value = (index.value + 1) % len;
    }

    function handleActions(action: ImageViewerAction, options = {}) {
      if (loading.value) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 1.4,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case 'zoomOut':
          if (transform.value.scale > 0.2) {
            transform.value.scale = parseFloat((transform.value.scale / zoomRate).toFixed(3));
          }
          break;
        case 'zoomIn':
          if (transform.value.scale < 7) {
            transform.value.scale = parseFloat((transform.value.scale * zoomRate).toFixed(3));
          }
          break;
        case 'clockwise':
          transform.value.deg += rotateDeg;
          break;
        case 'anticlockwise':
          transform.value.deg -= rotateDeg;
          break;
      }
      transform.value.enableTransition = enableTransition;
    }

    watch(currentImg, () => {
      nextTick(() => {
        const $img = imgRefs.value[0];
        if (!$img?.complete) {
          loading.value = true;
        }
      });
    });
    watch(
      () => props.initialIndex,
      (val) => {
        index.value = val;
      },
      { immediate: true }
    );
    watch(index, (val) => {
      reset();
      emit('switch', val);
    });

    const wrapperStyle = computed(() => {
      const style: objTy = {};
      props.position && (style['--e-viewer-position'] = props.position);
      return style as CSSProperties;
    });

    onMounted(() => {
      registerEventListener();
      // add tabindex then wrapper can be focusable via Javascript
      // focus wrapper so arrow key can't cause inner scroll behavior underneath
      wrapper.value?.focus?.();
      // TODO: 待优化
      // useLockscreen(loading)
    });

    return {
      index,
      setHelloRef,
      wrapper,
      imgRefs,
      isSingle,
      isFirst,
      isLast,
      currentImg,
      imgStyle,
      mode,
      computedZIndex,
      wrapperStyle,
      handleActions,
      prev,
      next,
      hide,
      toggleMode,
      handleImgLoad,
      handleImgError,
      handleMouseDown,
      ns
    };
  }
});
</script>
