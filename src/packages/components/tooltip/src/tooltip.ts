import { buildProps, definePropType } from '../../../utils/props';
import { usePopperTriggerProps, usePopperContentProps } from '../../popper/index';
import { useDelayedToggleProps, POPPER_CONTAINER_SELECTOR } from '../../../hooks';

import type { ExtractPropTypes } from 'vue';

const triggers = ['hover', 'focus', 'click', 'contextmenu'] as const;

export type Trigger = typeof triggers[number];

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...usePopperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: POPPER_CONTAINER_SELECTOR
  },
  content: {
    type: String,
    default: ''
  },
  rawContent: {
    type: Boolean,
    default: false
  },
  persistent: Boolean,
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: 'l-fade-in-linear'
  },
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean
  }
} as const);

export const useTooltipTriggerProps = buildProps({
  ...usePopperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType<Trigger | Trigger[]>([String, Array]),
    default: 'hover'
  }
} as const);

export const useTooltipProps = buildProps({
  openDelay: {
    type: Number
  },
  visibleArrow: {
    type: Boolean,
    default: undefined
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  showArrow: {
    type: Boolean,
    default: true
  }
});

export type ETooltipContentProps = ExtractPropTypes<typeof useTooltipContentProps>;

export type ETooltipTriggerProps = ExtractPropTypes<typeof useTooltipTriggerProps>;

export type ETooltipProps = ExtractPropTypes<typeof useTooltipProps> & ETooltipContentProps & ETooltipTriggerProps;
