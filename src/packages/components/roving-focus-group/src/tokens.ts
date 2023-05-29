import type { StyleValue, InjectionKey, Ref } from 'vue';
import type { LlRovingFocusGroupProps } from './roving-focus-group';

type EventHandler<T = Event> = (e: T) => void;

export type RovingGroupInjectionContext = {
  currentTabbedId: Ref<string | null>;
  dir: Ref<LlRovingFocusGroupProps['dir']>;
  loop: Ref<LlRovingFocusGroupProps['loop']>;
  orientation: Ref<LlRovingFocusGroupProps['orientation']>;
  tabIndex: Ref<number>;
  rovingFocusGroupRef: Ref<HTMLElement | null>;
  rovingFocusGroupRootStyle: Ref<StyleValue>;
  onBlur: EventHandler;
  onFocus: EventHandler<FocusEvent>;
  onMousedown: EventHandler;
  onItemFocus: (id: string) => void;
  onItemShiftTab: () => void;
};

export type RovingFocusGroupItemInjectionContext = {
  rovingFocusGroupItemRef: Ref<HTMLElement | null>;
  tabIndex: Ref<number>;
  handleMousedown: EventHandler;
  handleFocus: EventHandler;
  handleKeydown: EventHandler;
};

export const ROVING_FOCUS_GROUP_INJECTION_KEY: InjectionKey<RovingGroupInjectionContext> = Symbol('elRovingFocusGroup');

export const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY: InjectionKey<RovingFocusGroupItemInjectionContext> =
  Symbol('elRovingFocusGroupItem');
