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
    const ns = useNamespace('image');
    const attrs = useAttrs();
    const { t } = useLocaleInject();
    const loading = ref(true);
    const hasLoadError = ref(false);

    const containerStyle = computed(() => rawAttrs.style as StyleValue);

    return {
      ns,
      attrs,
      containerStyle,
      t,
      loading,
      hasLoadError
    };
  }
});
</script>
