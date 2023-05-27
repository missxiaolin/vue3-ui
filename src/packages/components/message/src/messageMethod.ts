import { createVNode, isVNode, render, ComponentPublicInstance } from 'vue';
import { messageTypes } from './message';
import MessageConstructor from './message.vue';
import type { Message, MessageProps, MessageQueue, MessageFn } from './message';

const instances: MessageQueue = [];
let seed = 1;
const GAP_SIZE = 16;

// TODO VNode渲染问题
const message: MessageFn & Partial<Message> = function (options = {}) {
  if (typeof window === 'undefined') return { close: () => undefined };

  if (typeof options === 'string' || isVNode(options)) {
    options = { message: options };
  }

  let verticalOffset = options.offset || 32;
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE;
  });
  verticalOffset += GAP_SIZE;

  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props: Partial<MessageProps> = {
    offset: verticalOffset,
    ...options,
    id,
    onClose: () => {
      close(id, userOnClose);
    }
  };
  let appendTo: HTMLElement | null = document.body;
  if (options.appendTo instanceof HTMLElement) {
    appendTo = options.appendTo;
  } else if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo);
  }
  if (!(appendTo instanceof HTMLElement)) {
    console.warn('MESSAGE', 'the appendTo option is not an HTMLElement. Falling back to document.body.');
    appendTo = document.body;
  }

  const container = document.createElement('div');
  container.className = `container_${id}`;

  let message = props.message;
  const vm = createVNode(
    MessageConstructor,
    props,
    // 如果是VNode 直接渲染为子元素
    isVNode(props.message) ? { default: () => message } : null
  );
  // 在关闭后从dom中移除
  vm.props!.onDestroy = () => {
    render(null, container);
  };

  render(vm, container);
  instances.push({ vm });
  appendTo.appendChild(container.firstElementChild!);

  return {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => ((vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>).visible = false)
  };
};

messageTypes.forEach((type) => {
  message[type] = (options = {}) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options
      };
    }
    return message({
      ...options,
      type
    });
  };
});

export function close(id: string, userOnClose?: Function): void {
  const idx = instances.findIndex(({ vm }) => id === vm.component!.props.id);
  if (idx === -1) return;

  const { vm } = instances[idx];
  if (!vm) return;
  userOnClose?.(vm);

  const removedHeight = vm.el!.offsetHeight;
  instances.splice(idx, 1);

  const len = instances.length;
  if (len < 1) return;
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el!.style['top'], 10) - removedHeight - GAP_SIZE;

    instances[i].vm.component!.props.offset = pos;
  }
}

export function closeAll(): void {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component;
    (instance?.proxy as any)?.close();
  }
}

message.closeAll = closeAll;

export default message as Message;
