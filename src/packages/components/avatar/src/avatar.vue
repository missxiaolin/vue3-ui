<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    />
    <l-icon v-else-if="icon" :size="iconSize" :icon="icon"></l-icon>
    <slot v-else />
  </span>
</template>

<script lang="ts">
import { computed, ref, watch, toRefs } from 'vue';
import { Icon } from '../../../components/icon/index';
import { useNamespace } from '../../../hooks';
import { avatarProps, avatarEmits } from './avatar';
import createComponent from '../../../utils/create';
import { addUnit, isNumber, isString } from '../../../utils/util';
import type { CSSProperties } from 'vue';
const { create, componentName } = createComponent('Avatar');

export default create({
  components: {
    [Icon.name]: Icon
  },
  props: avatarProps,
  emits: avatarEmits,

  setup(props, { emit }) {
    const hasLoadError = ref(false);
    const ns = useNamespace('avatar');
    const { name } = toRefs(props);

    const avatarClass = computed(() => {
      const { size, icon, shape } = props;
      const classList = [ns.b()];
      if (isString(size)) classList.push(ns.m(size));
      if (icon) classList.push(ns.m('icon'));
      if (shape) classList.push(ns.m(shape));
      return classList;
    });
    const sizeStyle = computed(() => {
      const { size } = props;
      return isNumber(size)
        ? ({
            '--l-avatar-size': addUnit(size)
          } as CSSProperties)
        : undefined;
    });

    const fitStyle = computed<CSSProperties>(() => ({
      objectFit: props.fit
    }));
    // need reset hasLoadError to false if src changed
    watch(
      () => props.src,
      () => (hasLoadError.value = false)
    );
    const iconSize = computed(() => props.size);
    const handleError = (e: Event) => {
      hasLoadError.value = true;
      emit('error', e);
    };
    return {
      ns,
      name,
      avatarClass,
      sizeStyle,
      fitStyle,
      handleError,
      iconSize,
      hasLoadError
    };
  }
});
</script>
