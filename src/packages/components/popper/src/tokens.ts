import type { InjectionKey, Ref } from 'vue';
import type { Instance } from '@popperjs/core';
import type { Measurable } from './popper';

export type PopperInjectionContext = {
  triggerRef: Ref<Measurable | null>;
  contentRef: Ref<HTMLElement | null>;
  popperInstanceRef: Ref<Instance | null>;
};

export type PopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | null>;
  arrowOffset: Ref<number | undefined>;
};

export const POPPER_INJECTION_KEY: InjectionKey<PopperInjectionContext> = Symbol('LPopper');

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<PopperContentInjectionContext> = Symbol('LPopperContent');

