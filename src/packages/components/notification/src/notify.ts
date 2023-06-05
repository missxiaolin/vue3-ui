import { createVNode, render, isVNode, ComponentPublicInstance, VNode } from 'vue';
import { notificationTypes } from './notification';
import NotificationConstructor from './notification.vue';

import type { NotificationOptions, Notify, NotifyFn, NotificationQueue, NotificationProps } from './notification';

// 消息队列
const notifications: Record<NotificationOptions['position'], NotificationQueue> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': []
};

const GAP_SIZE = 16;
let seed = 1;

const notify: NotifyFn & Partial<Notify> = function (options = {}) {
  if (typeof window === 'undefined') return { close: () => undefined };

  if (typeof options === 'string' || isVNode(options)) {
    options = { message: options };
  }
  const position = options.position || 'top-right';
  // 设置top距离
  let verticalOffset = options.offset || 0;
  notifications[position].forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE;
  });
  verticalOffset += GAP_SIZE;

  const id = `notify_${seed++}`;
  const userOnClose = options.onClose;
  const props: Partial<NotificationProps> = {
    offset: verticalOffset,
    ...options,
    id,
    onClose: () => {
      close(id, position, userOnClose);
    }
  };

  let appendTo: HTMLElement | null = document.body;
  if (options.appendTo instanceof HTMLElement) {
    appendTo = options.appendTo;
  } else if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo);
  }

  if (!(appendTo instanceof HTMLElement)) {
    console.warn('LNotification', 'the appendTo option is not an HTMLElement. Falling back to document.body.');
    appendTo = document.body;
  }

  const container = document.createElement('div');

  const vm = createVNode(
    NotificationConstructor,
    props,
    // 如果是VNode直接渲染为子元素
    isVNode(props.message) ? { default: () => props.message } : null
  );

  // 自动销毁
  vm.props!.onDestroy = () => {
    render(null, container);
  };

  render(vm, container);
  notifications[position].push({ vm });
  appendTo.appendChild(container.firstElementChild!);

  return {
    close: () => {
      (vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>).visible = false;
    }
  };
};

notificationTypes.forEach((type) => {
  notify[type] = (options = {}) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options
      };
    }
    return notify({
      ...options,
      type
    });
  };
});

/**
 * This function gets called when user click `x` button or press `esc` or the time reached its limitation.
 * Emitted by transition@before-leave event so that we can fetch the current notification.offsetHeight, if this was called
 * by @after-leave the DOM element will be removed from the page thus we can no longer fetch the offsetHeight.
 * @param {String} id notification id to be closed
 * @param {Position} position the positioning strategy
 * @param {Function} userOnClose the callback called when close passed by user
 */
export function close(id: string, position: NotificationOptions['position'], userOnClose?: Function): void {
  // maybe we can store the index when inserting the vm to notification list.
  const orientedNotifications = notifications[position];
  const idx = orientedNotifications.findIndex(({ vm }) => vm.component?.props.id === id);
  if (idx === -1) return;
  const { vm } = orientedNotifications[idx];
  if (!vm) return;
  // calling user's on close function before notification gets removed from DOM.
  userOnClose?.(vm);

  // note that this is called @before-leave, that's why we were able to fetch this property.
  const removedHeight = vm.el!.offsetHeight;
  const verticalPos = position.split('-')[0];
  orientedNotifications.splice(idx, 1);
  const len = orientedNotifications.length;
  if (len < 1) return;
  // starting from the removing item.
  for (let i = idx; i < len; i++) {
    // new position equals the current offsetTop minus removed height plus 16px(the gap size between each item)
    const { el, component } = orientedNotifications[i].vm;
    const pos = parseInt(el!.style[verticalPos], 10) - removedHeight - GAP_SIZE;
    component!.props.offset = pos;
  }
}

export function closeAll(): void {
  // loop through all directions, close them at once.
  for (const orientedNotifications of Object.values(notifications)) {
    orientedNotifications.forEach(({ vm }) => {
      // same as the previous close method, we'd like to make sure lifecycle gets handle properly.
      (vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>).visible = false;
    });
  }
}

notify.closeAll = closeAll;

export default notify as Notify;
