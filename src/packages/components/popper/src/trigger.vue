<template>
  <only-child v-if="!virtualTriggering" v-bind="$attrs" :aria-describedby="open ? id : undefined">
    <slot />
  </only-child>
</template>

<script lang="ts">
import { defineComponent, inject, watch } from 'vue';
import { OnlyChild } from '../../slot/index';
import { useForwardRef } from '../../../hooks';
import { usePopperTriggerProps } from './popper';
import { POPPER_INJECTION_KEY } from './tokens';
import { unwrapMeasurableEl } from './utils';
import createComponent from '../../../utils/create';
const { create } = createComponent('PopperTrigger');

export default create({
  components: {
    OnlyChild
  },
  inheritAttrs: false,
  props: {
    ...usePopperTriggerProps,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function,
    onKeydown: Function,
    onFocus: Function,
    onBlur: Function,
    onContextmenu: Function,
    id: String,
    open: Boolean
  },
  setup(props) {
    const { triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!;
    useForwardRef(triggerRef);

    watch(
      () => props.virtualRef,
      (val) => {
        if (val) {
          triggerRef.value = unwrapMeasurableEl(val);
        }
      },
      {
        immediate: true
      }
    );

    watch(
      () => triggerRef.value,
      (el, prevEl) => {
        if (el && el instanceof HTMLElement) {
          ['onMouseenter', 'onMouseleave', 'onClick', 'onKeydown', 'onFocus', 'onBlur', 'onContextmenu'].forEach(
            (eventName) => {
              const handler = props[eventName];
              if (handler) {
                (el as HTMLElement).addEventListener(eventName.slice(2).toLowerCase(), handler);
                (prevEl as HTMLElement)?.removeEventListener(eventName.slice(2).toLowerCase(), handler);
              }
            }
          );
        }
      },
      {
        immediate: true
      }
    );

    return {
      triggerRef
    };
  }
});
</script>
