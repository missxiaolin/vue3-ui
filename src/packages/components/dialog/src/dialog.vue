<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <overlay v-show="visible" :close-on-click-overlay="false" :z-index="zIndex" :overlay-class="modalClass">
        <div
          class="l-overlay-dialog"
          @click="overlayEvent.onClick"
          @mousedown="overlayEvent.onMousedown"
          @mouseup="overlayEvent.onMouseup"
        >
          <div
            ref="dialogRef"
            v-trap-focus
            :class="[
              ns.b(),
              ns.m(size),
              {
                'is-fullscreen': fullscreen,
                [ns.m('center')]: center
              },
              customClass
            ]"
            aria-modal="true"
            role="dialog"
            :aria-label="title || 'dialog'"
            :style="style"
            @click.stop
          >
            <slot name="header">
              <div :class="ns.e('header')">
                <slot name="title">
                  <span :class="ns.e('title')">{{ title }}</span>
                </slot>
                <button
                  v-if="showClose"
                  aria-label="close"
                  :class="ns.e('headerbtn')"
                  type="button"
                  @click="handleClose"
                >
                  <icon :class="ns.e('close')" icon="l-guanbi1"></icon>
                </button>
              </div>
            </slot>
            <template v-if="rendered">
              <slot name="body">
                <div :class="ns.e('body')">
                  <slot></slot>
                </div>
              </slot>
            </template>
            <div v-if="$slots.footer" :class="ns.e('footer')">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { ref } from 'vue';
import { TrapFocus } from '../../../directives';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { DialogProps, DialogEmits } from './dialog';
import { Overlay } from '../../overlay/index';
import { Icon } from '../../icon/index';
import { useSameTarget } from '../../../hooks';
import { useDialog } from './use-dialog';
const { create } = createComponent('Dialog');

export default create({
  components: {
    Icon,
    Overlay
  },
  directives: {
    TrapFocus
  },
  props: DialogProps,
  emits: DialogEmits,
  setup(props, ctx) {
    const dialogRef = ref<HTMLElement>();
    const dialog = useDialog(props, ctx, dialogRef);
    const overlayEvent = useSameTarget(dialog.onModalClick);
    const ns = useNamespace('dialog');

    return {
      ns,
      dialogRef,
      overlayEvent,
      ...dialog
    };
  }
});
</script>
