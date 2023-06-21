<template>
  <div :class="ns.b()"> </div>
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
  setup(props, { emit }) {
    const ns = useNamespace('image');

    return {
      ns
    };
  }
});
</script>
