<template>
  <tooltip
    ref="tooltipRef"
    v-bind="$attrs"
    trigger="click"
    effect="light"
    :popper-class="`${ns.namespace.value}-popover`"
    :teleported="compatTeleported"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :hide-after="hideAfter"
    :persistent="persistent"
  >
    <template #content>
      <div :class="ns.b()">
        <div :class="ns.e('main')">
          <l-icon v-if="!hideIcon && icon" :class="ns.e('icon')" :style="{ color: iconColor }" :icon="icon"></l-icon>
          {{ title }}
        </div>
        <div :class="ns.e('action')">
          <l-button size="mini" :type="cancelButtonType" @click="cancel">{{ finalCancelButtonText }}</l-button>
          <l-button size="mini" :type="confirmButtonType" @click="confirm">{{ finalConfirmButtonText }}</l-button>
        </div>
      </div>
    </template>
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>
  </tooltip>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';
import { Tooltip } from '../../../components/tooltip';
import { useDeprecateAppendToBody } from '../../../components/popper';
import { useLocaleInject, useNamespace } from '../../../hooks';
import { popconfirmProps } from './popconfirm';

import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Popconfirm');

export default create({
  components: {
    LButton: Button,
    Tooltip,
    LIcon: Icon
  },

  props: popconfirmProps,

  setup(props) {
    const { compatTeleported } = useDeprecateAppendToBody(componentName, 'appendToBody');
    const { t } = useLocaleInject();
    const ns = useNamespace('popconfirm');
    const tooltipRef = ref<{ onClose: () => void }>();

    const hidePopper = () => {
      unref(tooltipRef)?.onClose?.();
    };

    const handleCallback = () => {
      hidePopper();
    };

    const confirm = (e: Event) => {
      props.onConfirm?.(e);
      handleCallback();
    };
    const cancel = (e: Event) => {
      props.onCancel?.(e);
      handleCallback();
    };

    const finalConfirmButtonText = computed(() => props.confirmButtonText || t('el.popconfirm.confirmButtonText'));
    const finalCancelButtonText = computed(() => props.cancelButtonText || t('el.popconfirm.cancelButtonText'));

    return {
      finalConfirmButtonText,
      finalCancelButtonText,
      tooltipRef,
      ns,

      compatTeleported,

      confirm,
      cancel
    };
  }
});
</script>
