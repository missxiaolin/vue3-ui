<template>
  <transition name="l-notification-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="['l-notification', customClass, lightClass, horizontalClass]"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onClick"
    >
      <div v-if="iconComponent && iconComponent === 'info'" class="l-notification__info">
        <i></i>
      </div>
      <l-icon
        v-else-if="iconComponent"
        class="l-notification__icon"
        :class="typeClass"
        :icon="`l-${iconComponent}`"
      ></l-icon>
      <div class="e-notification__group">
        <div class="e-notification__title" v-text="title"></div>
        <div v-show="message" class="e-notification__content" :style="!!title ? undefined : { margin: 0 }">
          <div v-if="!dangerouslyUseHTMLString">{{ message }}</div>
          <div v-else v-html="message"></div>
        </div>
        <slot></slot>
        <div v-show="showBar" class="e-notification__bar">
          <l-button type="primary" @click="onBtnClick" size="mini">{{ btnText }}</l-button>
        </div>
        <l-icon v-show="showClose" icon="l-guanbi1" class="l-notification__closeBtn" @click.stop="close"></l-icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, CSSProperties, onUnmounted, onMounted, ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { NotificationProps, NotificationEmits } from './notification';
import { Icon } from '../../icon/index';
import { Button } from '../../button/index';
import { EVENT_CODE } from '../../../utils/aria';
const { componentName, create } = createComponent('Notification');

export default create({
  components: {
    LIcon: Icon,
    LButton: Button
  },
  props: NotificationProps,
  emits: NotificationEmits,
  setup(props, { emit }) {
    const visible = ref(false);

    const typeClass = computed(() => {
      const type = props.type;
      return type ? `l-notification--${type}` : '';
    });

    const iconType: { [key: string]: string } = {
      success: 'chenggong1',
      warning: 'jinggao1',
      info: 'wenhao_huabanfuben',
      error: 'shibai'
    };
    const iconComponent = computed(() => {
      return iconType[props.type] || props.icon || '';
    });

    const lightClass = computed(() => {
      return props.effect === 'light' ? 'light' : '';
    });
    const horizontalClass = computed(() => {
      return props.position.endsWith('right') ? 'right' : 'left';
    });
    const verticalProperty = computed(() => (props.position.startsWith('top') ? 'top' : 'bottom'));
    const positionStyle = computed<CSSProperties>(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`,
        zIndex: props.zIndex
      };
    });
    const showBar = computed(() => {
      return props.showBtn;
    });

    // 开启定时器
    let timer: number;
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
      componentName,
      visible,
      typeClass,
      iconComponent,
      lightClass,
      horizontalClass,
      positionStyle,
      showBar,

      startTimer,
      clearTimer,
      close
    };
  }
});
</script>
