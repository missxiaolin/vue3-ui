import type { InjectionKey, Ref } from 'vue';
import type { Instance } from '@popperjs/core';
import type { Measurable } from './popper';

export type PopperInjectionContext = {
  triggerRef: Ref<Measurable | null>;
  contentRef: Ref<HTMLElement | null>;
  popperInstanceRef: Ref<Instance | null>;
};

export const POPPER_INJECTION_KEY: InjectionKey<PopperInjectionContext> = Symbol('EPopper');
