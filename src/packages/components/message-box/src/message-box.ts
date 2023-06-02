import { h, createVNode, watch, render } from 'vue';
import { isClient } from '@vueuse/core';
import { isVNode, isString, hasOwn } from '../../../utils/util';
import MessageBoxConstructor from './index.vue';
import type { ComponentPublicInstance, VNode } from 'vue';

