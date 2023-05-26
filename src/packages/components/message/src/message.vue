<template>
  <transition name="l-message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="[ns.b(), customClass, typeClass, { 'is-closable': showClose, 'is-center': center }]"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <icon class="l-message__icon" :icon="iconComponent"></icon>
      <slot>
        <div v-if="!dangerouslyUseHTMLString" class="l-message__content">{{ message }}</div>
        <div v-else class="l-message__content" v-html="message"></div>
      </slot>
      <icon v-show="showClose" icon="l-guanbi1" class="l-message__closeBtn" @click.stop="close"></icon>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, CSSProperties, onMounted, onUnmounted, ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { Icon } from '../../icon/index';
import { EVENT_CODE } from '../../../utils/aria';
import { MessageProps, MessageEmits } from './message';
const { create, componentName } = createComponent('message');

export default create({
  components: {
    Icon
  },
  props: MessageProps,
  emits: MessageEmits,
  setup(props, { emit }) {
    const ns = useNamespace('message');
    const visible = ref(false);

    const typeClass = computed(() => {
      const type = props.type;
      return type ? `l-message__${type}` : '';
    });

    const iconType: { [key: string]: string } = {
      success: 'l-chenggong1',
      warning: 'l-wenhao_huabanfuben',
      info: 'l-jinggao1',
      error: 'l-shibai'
    };
    const iconComponent = computed(() => {
      return props.icon || iconType[props.type] || '';
    });

    const positionStyle = computed<CSSProperties>(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex
      };
    });

    // 开启定时器
    let timer: any;
    function startTimer() {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) close();
        }, props.duration);
      }
    }
    function clearTimer() {
      timer && clearTimeout(timer);
    }

    function close() {
      visible.value = false;
    }
    // 监听键盘事件
    function onKeydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
        clearTimer();
      } else if (code === EVENT_CODE.esc) {
        if (visible.value) {
          close();
        }
      } else {
        startTimer();
      }
    }

    // lifecycle
    onMounted(() => {
      visible.value = true;
      startTimer();
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', onKeydown);
    });

    return {
      ns,
      componentName,
      visible,
      typeClass,
      iconComponent,
      positionStyle,

      startTimer,
      clearTimer,
      close
    };
  }
});
</script>
