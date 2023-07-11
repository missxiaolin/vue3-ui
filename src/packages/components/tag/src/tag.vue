<template>
  <div v-if="disableTransitions" :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
    <slot></slot>
    <span v-if="closable" class="l-tag__icon" @click="handleClose">
      <l-icon icon="l-guanbi1" :size="iconSize"> </l-icon>
    </span>
  </div>
  <transition v-else name="l-zoom-in">
    <div :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
      <slot></slot>
      <span v-if="closable" class="l-tag__icon" @click.stop="handleClose">
        <l-icon icon="l-guanbi1" :size="iconSize"> </l-icon>
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import { tagProps, tagEmits } from './tag';
import createComponent from '../../../utils/create';
import { Icon } from '../../../components/icon';
const { create, useGlobalConfig } = createComponent('Tag');

export default create({
  components: {
    [Icon.name]: Icon
  },
  props: tagProps,
  emits: tagEmits,
  setup(props, { emit }) {
    const globalConfig = useGlobalConfig();
    const { type, hit, size, effect } = toRefs(props);
    const tagSize = size.value || globalConfig.size;
    const classes = computed(() => {
      return [
        'l-tag',
        tagSize ? `l-tag__${tagSize}` : 'l-tag__base',
        type.value ? `l-tag__${effect.value}--${props.type}` : `l-tag__${effect.value}--primary`,
        hit.value && 'is-hit'
      ];
    });
    const iconSize = computed(() => {
      return ['small', 'mini'].includes(tagSize) ? 12 : 13;
    });
    function handleClose(event: MouseEvent) {
      event.stopPropagation();
      emit('close', event);
    }
    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };
    return {
      classes,
      iconSize,
      handleClose,
      handleClick
    };
  }
});
</script>
