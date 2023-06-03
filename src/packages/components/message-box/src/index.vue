<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <overlay v-show="visible" :z-index="zIndex" :overlay-class="['is-message-box', modalClass]">
      <div
        class="l-overlay-message-box"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <div
          ref="rootRef"
          v-trap-focus
          role="dialog"
          :aria-label="title || 'dialog'"
          aria-modal="true"
          :class="['l-message-box', customClass, { 'l-message-box--center': center, 'is-draggable': draggable }]"
          :style="customStyle"
          @click.stop
        >
          <div v-if="title !== null && title !== undefined" ref="headerRef" class="l-message-box__header">
            <div class="l-message-box__title">
              <span>{{ title }}</span>
            </div>
            <button
              v-if="showClose"
              type="button"
              class="l-message-box__headerbtn"
              aria-label="Close"
              @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
              @keydown.prevent.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            >
              <icon class="l-message-box__close" icon="l-guanbi1"></icon>
            </button>
          </div>
          <div class="l-message-box__content">
            <div class="l-message-box__container">
              <icon
                v-if="iconComponent && !center && hasMessage"
                class="l-message-box__status"
                :icon="iconTypeName"
              ></icon>
              <div v-if="hasMessage" class="l-message-box__message">
                <slot>
                  <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                  <p v-else v-html="message"></p>
                </slot>
              </div>
            </div>
            <div v-show="showInput" class="l-message-box__input">
              <!-- 等form 组件做完回到这里写 -->
              <input style="border: solid 1px #ccc;" type="text" v-model="inputValue" name="" id="" />
              <div
                class="l-message-box__errormsg"
                :style="{
                  visibility: !!editorErrorMessage ? 'visible' : 'hidden'
                }"
                >{{ editorErrorMessage }}</div
              >
            </div>
          </div>
          <div class="l-message-box__btns">
            <l-button
              v-if="showCancelButton"
              :loading="cancelButtonLoading"
              :class="[cancelButtonClass]"
              :round="roundButton"
              :size="btnSize"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ cancelButtonText || t('l.messagebox.cancel') }}</l-button
            >
            <l-button
              v-show="showConfirmButton"
              ref="confirmRef"
              type="primary"
              :loading="confirmButtonLoading"
              :class="[confirmButtonClasses]"
              :round="roundButton"
              :disabled="confirmButtonDisabled"
              :size="btnSize"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ confirmButtonText || t('l.messagebox.confirm') }}</l-button
            >
          </div>
        </div>
      </div>
    </overlay>
  </transition>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, onBeforeUnmount, computed, watch, reactive, ref, toRefs } from 'vue';
import { Button } from '../../button/index';
import { TrapFocus } from '../../../directives';
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
import { Overlay } from '../../overlay';
import { on, off } from '../../../utils/dom';
import { isValidComponentSize } from '../../../utils/resize-event';
import { EVENT_CODE } from '../../../utils/aria';
import { Icon } from '../../icon';

import type { PropType } from 'vue';
import type { ComponentSize } from '../../../constants/event';
import type { Action, MessageBoxState, MessageBoxType } from './message-box.type';

import createComponent from '../../..//utils/create';
const { componentName, create } = createComponent('MessageBox');

export default create({
  directives: {
    TrapFocus
  },
  components: {
    LButton: Button,
    Overlay,
    Icon
  },
  inheritAttrs: false,
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
    // const popup = usePopup(props, doClose)
    const { t } = useLocaleInject();
    const visible = ref(false);
    const { nextZIndex } = useZIndex();
    // s represents state
    const state = reactive<MessageBoxState>({
      beforeClose: null,
      callback: null,
      cancelButtonText: '取消',
      cancelButtonClass: '',
      confirmButtonText: '确认',
      confirmButtonClass: '',
      customClass: '',
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: '',
      inputPattern: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: '',
      message: null,
      modalFade: true,
      modalClass: '',
      showCancelButton: false,
      showConfirmButton: true,
      type: '',
      title: undefined,
      showInput: false,
      action: '' as Action,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex()
    });

    const iconTypeName = computed(() => {
      const type = state.type;
      // return type && TypeComponentsMap[type]
      return type ? `e-icon-${type}` : '';
    });

    const btnSize = useSize(
      computed(() => props.buttonSize),
      { prop: true, form: true, formItem: true }
    );

    const iconComponent = computed(
      // () => state.icon || TypeComponentsMap[state.type] || ''
      () => state.icon || ''
    );
    const hasMessage = computed(() => !!state.message);
    const rootRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const inputRef = ref<HTMLElement>();
    const confirmRef = ref<HTMLElement>();

    const confirmButtonClasses = computed(() => state.confirmButtonClass);

    watch(
      () => state.inputValue,
      async (val) => {
        await nextTick();
        if (props.boxType === 'prompt' && val !== null) {
          validate();
        }
      },
      { immediate: true }
    );

    watch(
      () => visible.value,
      (val) => {
        if (val) {
          if (props.boxType === 'alert' || props.boxType === 'confirm') {
            nextTick().then(() => {
              confirmRef.value?.$el?.focus?.();
            });
          }
          state.zIndex = nextZIndex();
        }
        if (props.boxType !== 'prompt') return;
        if (val) {
          nextTick().then(() => {
            if (inputRef.value && inputRef.value.$el) {
              getInputElement().focus();
            }
          });
        } else {
          state.editorErrorMessage = '';
          state.validateError = false;
        }
      }
    );

    const draggable = computed(() => props.draggable);
    useDraggable(rootRef, headerRef, draggable);

    onMounted(async () => {
      await nextTick();
      if (props.closeOnHashChange) {
        on(window, 'hashchange', doClose);
      }
    });

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        off(window, 'hashchange', doClose);
      }
    });

    function doClose() {
      if (!visible.value) return;
      visible.value = false;
      nextTick(() => {
        if (state.action) emit('action', state.action);
      });
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel');
      }
    };

    const overlayEvent = useSameTarget(handleWrapperClick);

    const handleInputEnter = () => {
      if (state.inputType !== 'textarea') {
        return handleAction('confirm');
      }
    };

    const handleAction = (action: Action) => {
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return;
      }

      state.action = action;

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose);
      } else {
        doClose();
      }
    };

    const validate = () => {
      if (props.boxType === 'prompt') {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue || '')) {
          state.editorErrorMessage = state.inputErrorMessage || t('e.messagebox.error');
          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(state.inputValue);
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t('e.messagebox.error');
            state.validateError = true;
            return false;
          }
          if (typeof validateResult === 'string') {
            state.editorErrorMessage = validateResult;
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage = '';
      state.validateError = false;
      return true;
    };

    const getInputElement = () => {
      const inputRefs = inputRef.value.$refs;
      return (inputRefs.input || inputRefs.textarea) as HTMLElement;
    };

    const handleClose = () => {
      handleAction('close');
    };

    // when close on press escape is disabled, pressing esc should not callout
    // any other message box and close any other dialog-ish elements
    // e.g. Dialog has a close on press esc feature, and when it closes, it calls
    // props.beforeClose method to make a intermediate state by callout a message box
    // for some verification or alerting. then if we allow global event liek this
    // to dispatch, it could callout another message box.
    if (props.closeOnPressEscape) {
      useModal(
        {
          handleClose
        },
        visible
      );
    } else {
      usePreventGlobal(visible, 'keydown', (e: KeyboardEvent) => e.code === EVENT_CODE.esc);
    }

    // locks the screen to prevent scroll
    if (props.lockScroll) {
      useLockscreen(visible);
    }

    // restore to prev active element.
    useRestoreActive(visible);

    return {
      ...toRefs(state),
      appendToBody: false,
      overlayEvent,
      visible,
      hasMessage,
      iconTypeName,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      headerRef,
      inputRef,
      confirmRef,
      doClose, // for outside usage
      handleClose, // for out side usage
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t
    };
  }
});
</script>
