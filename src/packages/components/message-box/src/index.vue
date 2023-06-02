<template>
  <div> </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onBeforeUnmount, computed, watch, reactive, ref, toRefs } from 'vue';
import { Button } from '../../button/index';
import { Overlay } from '../../overlay/index';
import { Icon } from '../../icon/index';
import { TrapFocus } from '../../../directives';
import createComponent from '../../../utils/create';
import { isValidComponentSize } from '../../../utils/resize-event';
import type { MessageBoxType } from './message-box.type';
import type { ComponentSize } from '../../../constants/event';
import type { PropType } from 'vue';
import {
  useModal,
  useLockscreen,
  useLocaleInject,
  useRestoreActive,
  usePreventGlobal,
  useSize,
  useDraggable,
  useSameTarget,
  useZIndex
} from '../../../hooks';
const { componentName, create } = createComponent('MessageBox');

export default create({
  inheritAttrs: false,
  directives: {
    TrapFocus
  },
  components: {
    Button,
    Overlay,
    Icon
  },
  props: {
    buttonSize: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    draggable: Boolean,
    roundButton: {
      default: false,
      type: Boolean
    },
    container: {
      type: String, // default append to body
      default: 'body'
    },
    boxType: {
      type: String as PropType<MessageBoxType>,
      default: ''
    }
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    const { t } = useLocaleInject();
  }
});
</script>
