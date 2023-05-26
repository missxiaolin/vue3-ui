import type { VNode, ExtractPropTypes } from 'vue';

export const messageTypes = ['success', 'info', 'warning', 'error'] as const;

export const MessageProps = {
  message: {
    type: [String, Object],
    default: ''
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
    default: 2500
  },
  icon: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  offset: {
    type: Number,
    default: 32
  },
  onClose: {
    type: Function,
    required: false
  },
  onClick: {
    type: Function,
    default: () => undefined
  },
  onBtnClick: {
    type: Function,
    default: () => undefined
  },
  showClose: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    values: [...messageTypes, ''],
    default: 'info'
  },
  zIndex: {
    type: Number,
    default: 10010
  },
  center: {
    type: Boolean,
    default: false
  }
};

export type MessageProps = ExtractPropTypes<typeof MessageProps>;

export const MessageEmits = {
  destroy: () => true,
  click: () => true
};
export type MessageEmits = typeof MessageEmits;
