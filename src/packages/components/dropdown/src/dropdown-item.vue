<template>
    <dropdown-collection-item :disabled="disabled" :text-value="textValue ?? textContent">
      <roving-focus-item :focusable="!disabled">
        <dropdown-item-impl
          v-bind="propsAndAttrs"
          @pointerleave="handlePointerLeave"
          @pointermove="handlePointerMove"
          @click="handleClick"
        >
          <slot />
        </dropdown-item-impl>
      </roving-focus-item>
    </dropdown-collection-item>
  </template>
  <script lang="ts">
  import { computed, defineComponent, getCurrentInstance, inject, ref, unref } from 'vue';
  import { RovingFocusItem } from '../../roving-focus-group';
  import { composeEventHandlers, whenMouse } from '../../../utils/dom';
  import DropdownItemImpl from './dropdown-item-impl.vue';
  import { useDropdown } from './useDropdown';
  import { LCollectionItem as DropdownCollectionItem, dropdownItemProps } from './dropdown';
  import { DROPDOWN_INJECTION_KEY } from './tokens';
  
  import createComponent from '../../../utils/create';
  const { create } = createComponent('DropdownItem');
  export default create({
    components: {
      DropdownCollectionItem,
      RovingFocusItem,
      DropdownItemImpl
    },
    inheritAttrs: false,
    props: dropdownItemProps,
    emits: ['pointermove', 'pointerleave', 'click'],
    setup(props, { emit, attrs }) {
      const { elDropdown } = useDropdown();
      const _instance = getCurrentInstance();
      const itemRef = ref<HTMLElement | null>(null);
      const textContent = computed(() => unref(itemRef)?.textContent ?? '');
      const { onItemEnter, onItemLeave } = inject(DROPDOWN_INJECTION_KEY, undefined)!;
  
      const handlePointerMove = composeEventHandlers(
        (e: PointerEvent) => {
          emit('pointermove', e);
          return e.defaultPrevented;
        },
        whenMouse((e) => {
          if (props.disabled) {
            onItemLeave(e);
          } else {
            onItemEnter(e);
            if (!e.defaultPrevented) {
              (e.currentTarget as HTMLElement)?.focus();
            }
          }
        })
      );
  
      const handlePointerLeave = composeEventHandlers(
        (e: PointerEvent) => {
          emit('pointerleave', e);
          return e.defaultPrevented;
        },
        whenMouse((e) => {
          onItemLeave(e);
        })
      );
  
      const handleClick = composeEventHandlers(
        (e: PointerEvent) => {
          emit('click', e);
          return e.defaultPrevented;
        },
        (e) => {
          if (props.disabled) {
            e.stopImmediatePropagation();
            return;
          }
          if (elDropdown?.hideOnClick?.value) {
            elDropdown.handleClick?.();
          }
          elDropdown.commandHandler?.(props.command, _instance, e);
        }
      );
  
      // direct usage of v-bind={ ...$props, ...$attrs } causes type errors
      const propsAndAttrs = computed(() => {
        return { ...props, ...attrs };
      });
  
      return {
        handleClick,
        handlePointerMove,
        handlePointerLeave,
        textContent,
        propsAndAttrs
      };
    }
  });
  </script>
  