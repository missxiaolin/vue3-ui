<template>
  <transition name="overlay-fade">
    <view :class="classes" @click.stop="onClick" :style="style" v-show="visible" :modal="modal">
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
import { UPDATE_OVERLAY_EVENT } from '../../../constants/event';
const { componentName, create } = createComponent('Overlay');

export default create({
  props: OverlayProps,
  emits: OverlayEmits,
  setup(props, { emit }) {
    const ns = useNamespace('overlay');

    const [lock, unlock] = useLockScroll(() => props.lockScroll);

    const classes = computed(() => {
      return [
        ns.b(),
        props.overlayClass || '',
        props.modal ? '' : ns.is('modal') // 是否显示遮罩层
      ];
    });

    const style: ComputedRef = computed(() => {
      return {
        transitionDuration: `${props.duration}s`,
        zIndex: props.zIndex,
        [props.position]: `${props.offset}px`,
        ...props.overlayStyle
      };
    });

    watchEffect(() => {
      props.visible ? lock() : unlock();
    });

    const onClick = (e: MouseEvent) => {
      emit('click', e);
      if (props.closeOnClickOverlay) {
        emit(UPDATE_OVERLAY_EVENT, false);
      }
    };

    return { componentName, classes, style, onClick };
  }
});
</script>
