<template>
  <div ref="container" :class="[ns.b(), $attrs.class]" :style="containerStyle">
    <slot v-if="loading" name="placeholder">
      <div :class="ns.e('placeholder')"></div>
    </slot>
    <slot v-else-if="hasLoadError" name="error">
      <div :class="ns.e('error')">{{ t('el.image.error') }}</div>
    </slot>
    <img
      v-else
      v-bind="attrs"
      :src="src"
      :style="imageStyle"
      :class="[ns.e('inner'), preview ? ns.e('preview') : '']"
    />
     <!-- <ImagePreview /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch, nextTick } from 'vue';
import { isString } from '@vue/shared';
import { useEventListener, useThrottleFn, isClient, isBoolean } from '@vueuse/core';
import { useAttrs, useLocaleInject, useNamespace, useDeprecated } from '../../../hooks';
import { ImagePreview } from '../../image-preview/index';
import { getScrollContainer, isInContainer } from '../../../utils/dom';
import { imageEmits, imageProps } from './image';

import type { CSSProperties, StyleValue } from 'vue';

const isHtmlElement = (e: any): e is Element => e && e.nodeType === Node.ELEMENT_NODE;

let prevOverflow = '';

import createComponent from '../../../utils/create';
const { create } = createComponent('Image');

export default create({
  components: {
    ImagePreview
  },
  inheritAttrs: false,

  props: imageProps,
  emits: imageEmits,
  setup(props, { emit, attrs: rawAttrs }) {
    useDeprecated(
      {
        scope: 'l-image',
        from: 'append-to-body',
        replacement: 'preview-teleported',
        version: '0.0.0',
        ref: ''
      },
      computed(() => isBoolean(props.appendToBody))
    );

    const { t } = useLocaleInject();
    const ns = useNamespace('image');

    const attrs = useAttrs();
    const hasLoadError = ref(false);
    const loading = ref(true);
    const imgWidth = ref(0);
    const imgHeight = ref(0);
    const showViewer = ref(false);
    const container = ref<HTMLElement>();

    const _scrollContainer = ref<HTMLElement | Window>();
    let stopScrollListener: () => void;
    let stopWheelListener: () => void;

    const imageStyle = computed<CSSProperties>(() => {
      const { fit } = props;
      if (isClient && fit) {
        return { objectFit: fit };
      }
      return {};
    });

    const containerStyle = computed(() => rawAttrs.style as StyleValue);

    const loadImage = () => {
      if (!isClient) return;
      // reset status
      loading.value = true;
      hasLoadError.value = false;

      const img = new Image();
      const currentImageSrc = props.src;

      // load & error callbacks are only responsible for currentImageSrc
      img.addEventListener('load', (e) => {
        if (currentImageSrc !== props.src) {
          return;
        }
        handleLoad(e, img);
      });
      img.addEventListener('error', (e) => {
        if (currentImageSrc !== props.src) {
          return;
        }
        handleError(e);
      });

      // bind html attrs
      // so it can behave consistently
      Object.entries(attrs.value).forEach(([key, value]) => {
        // avoid onload to be overwritten
        if (key.toLowerCase() === 'onload') return;
        img.setAttribute(key, value as string);
      });
      img.src = currentImageSrc;
    }

    function handleLoad(e: Event, img: HTMLImageElement) {
      imgWidth.value = img.width;
      imgHeight.value = img.height;
      loading.value = false;
      hasLoadError.value = false;
    }

    function handleError(event: Event) {
      loading.value = false;
      hasLoadError.value = true;
      emit('error', event);
    }

    async function addLazyLoadListener() {

    }

    function removeLazyLoadListener() {

    }

    watch(
      () => props.src,
      () => {
        if (props.lazy) {
          // reset status
          loading.value = true;
          hasLoadError.value = false;
          removeLazyLoadListener();
          addLazyLoadListener();
        } else {
          loadImage();
        }
      }
    );

    onMounted(() => {
      if (props.lazy) {
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });

    return {
      ns,
      attrs,
      containerStyle,
      imageStyle,
      t,
      loading,
      hasLoadError
    };
  }
});
</script>
