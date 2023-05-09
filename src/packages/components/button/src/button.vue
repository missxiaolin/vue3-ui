<template>
  <button
    :class="[
      'l-button',
      buttonType ? 'l-button--' + buttonType : '',
      buttonSize ? 'l-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    v-repeat-click:[clickTime]="handleClick"
  >
    <l-icon v-if="leftIcon" class="l-button-icon" :icon="leftIcon"></l-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, useGlobalConfig, create } = createComponent('Button');
import { buttonProps } from './button';
import { Icon } from '../../icon/index';
import { RepeatClick } from '../../../directives';

export default create({
  components: {
    [Icon.name]: Icon
  },
  directives: {
    RepeatClick
  },
  emits: ['click'],
  props: buttonProps,
  setup(props, { emit }) {
    const globalConfig = useGlobalConfig();
    const { size, disabled, loading, clickTime, icon } = toRefs(props);
    let btnSize: any = size
    const buttonSize = computed(() => btnSize.value || globalConfig.size);
    const buttonType = computed(() => props.type || 'default');

    const handleClick = (event: MouseEvent) => {
      if (!loading.value && !disabled.value) {
        emit('click', event);
      }
    };
    const leftIcon = computed(() => {
      return loading.value ? 'l-loading' : icon.value;
    });

    return {
      componentName,
      buttonSize,
      buttonType,
      disabled,
      clickTime,
      leftIcon,
      handleClick
    };
  }
});
</script>
