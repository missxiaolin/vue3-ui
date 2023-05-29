<template>
  <div :class="ns.b()">
    <tooltip
      ref="popperRef"
      :effect="effect"
      :fallback-placements="['bottom', 'top']"
      :popper-options="popperOptions"
      :gpu-acceleration="false"
      :hide-after="hideTimeout"
      :manual-mode="true"
      :placement="placement"
      :popper-class="[ns.e('popper'), popperClass]"
      :reference-element="referenceElementRef?.$el"
      :trigger="trigger"
      :show-after="showTimeout"
      :stop-popper-mouse-event="false"
      :virtual-ref="triggeringElementRef"
      :virtual-triggering="splitButton"
      append-to-body
      pure
      :transition="`${ns.namespace.value}-zoom-in-top`"
      persistent
      @show="$emit('visible-change', true)"
      @hide="$emit('visible-change', false)"
    >
      <template #content>
        <l-scroll ref="scrollbar" :wrap-style="wrapStyle" tag="ul" :view-class="ns.e('list')">
          <focus-trap trapped @mount-on-focus="onMountOnFocus">
            <l-roving-focus-group
              :loop="loop"
              :current-tab-id="currentTabId"
              orientation="horizontal"
              @current-tab-id-change="handleCurrentTabIdChange"
              @entry-focus="handleEntryFocus"
            >
              <dropdown-collection>
                <slot name="dropdown"></slot>
              </dropdown-collection>
            </l-roving-focus-group>
          </focus-trap>
        </l-scroll>
      </template>
      <template v-if="!splitButton" #default>
        <div :class="dropdownTriggerKls">
          <slot name="default" />
        </div>
      </template>
      <template v-if="splitButton">
        <l-button-group>
          <l-button ref="referenceElementRef" :size="dropdownSize" :type="type" @click="handlerMainButtonClick">
            <slot name="default" />
          </l-button>
          <l-button ref="triggeringElementRef" :size="dropdownSize" :type="type" :class="ns.e('caret-button')">
            <l-icon :class="ns.e('icon')" icon="l-xia"></l-icon>
          </l-button>
        </l-button-group>
      </template>
    </tooltip>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, provide, ref, toRef, unref } from 'vue';
import { Button } from '../../button';
import { ButtonGroup } from '../../button';
import { Tooltip } from '../../tooltip';
import { Scroll } from '../../scroll';
import { Icon } from '../../icon';
import { FocusTrap } from '../../focus-trap';
import { RovingFocusGroup } from '../../roving-focus-group';
import { addUnit } from '../../../utils/util';
import { useNamespace, useSize } from '../../../hooks';
import { ECollection as DropdownCollection, dropdownProps } from './dropdown';
import { DROPDOWN_INJECTION_KEY } from './tokens';

import type { CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
const { create } = createComponent('Dropdown');
export default create({
  components: {
    Button,
    FocusTrap,
    ButtonGroup,
    Scroll,
    DropdownCollection,
    Tooltip,
    [RovingFocusGroup.name]: RovingFocusGroup,
    Icon
  },
  props: dropdownProps,
  emits: ['visible-change', 'click', 'command'],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const ns = useNamespace('dropdown');

    const triggeringElementRef = ref();
    const referenceElementRef = ref();
    const popperRef = ref<InstanceType<typeof Tooltip> | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    const scrollbar = ref(null);
    const currentTabId = ref<string | null>(null);
    const isUsingKeyboard = ref(false);

    const wrapStyle = computed<CSSProperties>(() => ({
      maxHeight: addUnit(props.maxHeight)
    }));
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);

    function handleClick() {
      handleClose();
    }

    function handleClose() {
      popperRef.value?.onClose();
    }

    function handleOpen() {
      popperRef.value?.onOpen();
    }

    const dropdownSize = useSize();

    function commandHandler(...args: any[]) {
      emit('command', ...args);
    }

    function onItemEnter() {
      // NOOP for now
    }

    function onItemLeave() {
      const contentEl = unref(contentRef);

      contentEl?.focus();
      currentTabId.value = null;
    }

    function handleCurrentTabIdChange(id: string) {
      currentTabId.value = id;
    }

    function handleEntryFocus(e: Event) {
      if (!isUsingKeyboard.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }

    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave
    });

    provide('EDropdown', {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, 'trigger'),
      hideOnClick: toRef(props, 'hideOnClick')
    });

    const onMountOnFocus = (e: Event) => {
      e.preventDefault();
      contentRef.value?.focus?.({
        preventScroll: true
      });
    };

    const handlerMainButtonClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return {
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleEntryFocus,
      handleClose,
      handleOpen,
      onMountOnFocus,
      popperRef,
      triggeringElementRef,
      referenceElementRef
    };
  }
});
</script>
