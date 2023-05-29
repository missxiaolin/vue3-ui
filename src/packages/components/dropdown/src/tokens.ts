import type { InjectionKey, Ref } from 'vue';

export type LDropdownInjectionContext = {
  contentRef: Ref<HTMLElement | null>;
  isUsingKeyboard: Ref<boolean>;
  onItemLeave: (e: PointerEvent) => void;
  onItemEnter: (e: PointerEvent) => void;
};

export const DROPDOWN_INJECTION_KEY: InjectionKey<LDropdownInjectionContext> = Symbol('LDropdown');
