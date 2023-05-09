import { on } from '../../utils/dom';

import type { ObjectDirective, DirectiveBinding } from 'vue';

/**
 * 指令
 */
const RepeatClick: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    let interval: any = null;
    const time: any = binding.arg || 500;
    const handler = () => binding.value && binding.value();
    on(el, 'click', (e: any) => {
      if ((e as any).button !== 0) return;
      if (!interval) {
        handler();
        interval = setTimeout(() => {
          clearTimeout(interval);
          interval = null;
        }, time);
      }
    });
  }
};

export default RepeatClick;