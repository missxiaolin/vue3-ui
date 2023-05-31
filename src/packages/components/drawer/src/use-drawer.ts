import { computed, ref, onMounted, watch } from 'vue';

import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { isNumber } from '../../../utils/util';

import isServer from '../../../utils/isServer';

import type { CSSProperties, SetupContext } from 'vue';
import type { DialogEmits, DialogProps } from './drawer';

/**
 * @param props 
 * @param param1 
 * @returns 
 */
export const useDrawer = (props: DialogProps, { emit }: SetupContext<DialogEmits>) => {
  const rendered = ref(false);
  const visible = ref(false);
  const closed = ref(false);
  const zIndex = ref(props.zIndex || 0);

  const normalizeWidth = computed(() => (isNumber(props.width) ? `${props.width}px` : props.width));

  const style = computed<CSSProperties>(() => {
    const style: Record<any, any> = {};
    const varPrefix = `--l-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style[`${varPrefix}-margin-top`] = props.top;
      }
      if (props.width) {
        style[`${varPrefix}-width`] = normalizeWidth.value;
      }
    }
    return style;
  });

  function afterEnter() {
    emit('opened');
  }

  function afterLeave() {
    emit('closed');
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }

  function beforeLeave() {
    emit('close');
  }

  function doOpen() {
    if (isServer) {
      return;
    }

    visible.value = true;
  }

  function doClose() {
    visible.value = false;
  }

  function hide(shouldCancel: boolean) {
    if (shouldCancel) return;
    closed.value = true;
    visible.value = false;
  }

  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      doClose();
    }
  }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        closed.value = false;
        doOpen();
        rendered.value = true;
        emit('open');
        zIndex.value++;
      } else {
        if (visible.value) {
          doClose();
        }
      }
    }
  );

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      rendered.value = true; // enables lazy rendering
      doOpen();
    }
  });

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    onModalClick,
    handleClose,
    rendered,
    closed,
    style,
    visible
  };
};
