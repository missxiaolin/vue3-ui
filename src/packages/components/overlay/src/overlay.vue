<template>
  <transition name="overlay-fade">
    <view :class="classes" @click.stop="onClick" :style="style" v-show="visible">
      <slot></slot>
    </view>
  </transition>
</template>

<script lang="ts">
import { computed, watchEffect, ComputedRef } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { useLockScroll } from '../../../utils/dom';
import { OverlayEmits, OverlayProps } from './overlay';
const { componentName, create } = createComponent('Overlay');

export default create({
  props: OverlayProps,
  emits: OverlayEmits,
  setup(props, { emit }) {
    const ns = useNamespace('overlay')
    const [lock, unlock] = useLockScroll(() => props.lockScroll);

    const classes = computed(() => {
      return [
        ns.b(),
        props.overlayClass || ""
      ]
    });

    const style: ComputedRef = computed(() => {
      return {
        transitionDuration: `${props.duration}s`,
        zIndex: props.zIndex,
        ...props.overlayStyle
      };
    });

    watchEffect(() => {
      props.visible ? lock() : unlock();
    });

    const onClick = (e: MouseEvent) => {
      emit('click', e);
      if (props.closeOnClickOverlay) {
        emit('update:visible', false);
      }
    };

    return { componentName, classes, style, onClick };
  }
});
</script>
