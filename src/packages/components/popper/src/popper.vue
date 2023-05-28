<template>
  <slot />
</template>

<script lang="ts">
import { ref, provide } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { POPPER_INJECTION_KEY } from './tokens';
import type { PopperInjectionContext } from './tokens';
const { create } = createComponent('Popper');

export default create({
  inheritAttrs: false,
  setup(props, { emit }) {
    const ns = useNamespace('popper');
    const popperProvides = {
      triggerRef: ref<HTMLElement | null>(null),
      popperInstanceRef: ref(null),
      contentRef: ref(null)
    } as PopperInjectionContext;
    provide(POPPER_INJECTION_KEY, popperProvides);
    return {
      ns,
      ...popperProvides
    };
  }
});
</script>
