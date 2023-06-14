import { buttonTypes } from '../../../components/button/src/button';
import { buildProps, definePropType, iconPropType } from '../../../utils/props';
import { useTooltipContentProps } from '../../../components/tooltip';
import type { Component, ExtractPropTypes } from 'vue';

export const popconfirmProps = buildProps({
  title: {
    type: String
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonType: {
    type: String,
    values: buttonTypes,
    default: 'primary'
  },
  cancelButtonType: {
    type: String,
    values: buttonTypes,
    default: 'text'
  },
  icon: {
    type: iconPropType,
    default: 'l-wenhao_huabanfuben' //QuestionFilled as Component,
  },
  iconColor: {
    type: String,
    default: '#f90'
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  onConfirm: {
    type: definePropType<(e: Event) => Promise<void> | void>(Function)
  },
  onCancel: {
    type: definePropType<(e: Event) => Promise<void> | void>(Function)
  },
  teleported: useTooltipContentProps.teleported,
  persistent: useTooltipContentProps.persistent
} as const);
export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>;
