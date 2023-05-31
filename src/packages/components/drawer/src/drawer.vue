<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="l-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <overlay v-show="visible">
        <div
          ref="drawerRef"
          aria-modal="true"
          aria-labelledby="l-drawer__title"
          :aria-label="title"
          :class="['l-drawer', direction, visible && 'open', customClass]"
          :style="isHorizontal ? 'width: ' + drawerSize : 'height: ' + drawerSize"
          role="dialog"
          @click.stop
        >
          <header v-if="withHeader" id="l-drawer__title" class="l-drawer__header">
            <slot name="title">
              <span role="heading" :title="title">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              :aria-label="'close ' + (title || 'drawer')"
              class="l-drawer__close-btn"
              type="button"
              @click="handleClose"
            >
              <icon icon="l-guanbi1"></icon>
            </button>
          </header>
          <template v-if="rendered">
            <section class="l-drawer__body">
              <slot></slot>
            </section>
          </template>
        </div>
      </overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { DialogProps, DialogEmits, PD } from './drawer';
import { useDrawer } from './use-drawer';
import type { SetupContext } from 'vue';
import { Overlay } from '../../overlay/index';
import { Icon } from '../../icon/index';

const { create } = createComponent('Drawer');

export default create({
  components: {
    Icon,
    Overlay
  },
  props: DialogProps,
  emits: DialogEmits,
  setup(props, ctx) {
    const ns = useNamespace('drawer');
    const drawerRef = ref<HTMLElement>(null);
    return {
      ns,
      ...useDrawer(props, ctx as SetupContext),
      drawerRef,
      isHorizontal: computed(() => props.direction === 'rtl' || props.direction === 'ltr'),
      drawerSize: computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size)),
      PD
    };
  }
});
</script>
