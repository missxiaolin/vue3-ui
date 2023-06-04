import type { VNode, ExtractPropTypes } from 'vue';

export const notificationTypes = ['success', 'info', 'warning', 'error'] as const;

export const notifyPositions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

export const NotificationProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 4500
  },
  effect: {
    type: String,
    values: ['dark', 'light'],
    default: 'light'
  },
  icon: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  message: {
    type: [String, Object],
    default: ''
  },
  offset: {
    type: Number,
    default: 62
  },
  onClose: {
    type: Function,
    required: true
  },
  onClick: {
    type: Function,
    default: () => undefined
  },
  onBtnClick: {
    type: Function,
    default: () => undefined
  },
  position: {
    type: String,
    values: [...notifyPositions],
    default: 'top-right'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: '提示'
  },
  type: {
    type: String,
    values: [...notificationTypes, ''],
    default: ''
  },
  zIndex: {
    type: Number,
    default: 9999
  },
  showBtn: {
    type: Boolean,
    default: false
  },
  btnText: {
    type: String,
    default: '立即查看'
  }
};

export type NotificationProps = ExtractPropTypes<typeof NotificationProps>;

export const NotificationEmits = {
  destroy: () => true,
  click: () => true
};
export type NotificationEmits = typeof NotificationEmits;

export type NotificationOptions = Omit<NotificationProps, 'id'> & {
  appendTo?: HTMLElement | string;
};
export type NotificationOptionsTyped = Omit<NotificationProps, 'type'>;

export interface NotificationHandle {
  close: () => void;
}

export type NotificationParams = Partial<NotificationOptions> | string | VNode;
export type NotificationParamsTyped = Partial<NotificationOptionsTyped> | string | VNode;

export type NotifyFn = ((options?: NotificationParams) => NotificationHandle) & { closeAll: () => void };

export type NotifyTypedFn = (options?: NotificationParamsTyped) => NotificationHandle;

export interface Notify extends NotifyFn {
  success: NotifyTypedFn;
  warning: NotifyTypedFn;
  error: NotifyTypedFn;
  info: NotifyTypedFn;
}

export interface NotificationQueueItem {
  vm: VNode;
}

export type NotificationQueue = NotificationQueueItem[];
