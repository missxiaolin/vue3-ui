<template>
  <div :class="[ns.b()]">
    <div :class="ns.e('image')" :style="imageStyle">
      <img v-if="image" :src="image" />
      <slot v-else name="image">
        <Default />
      </slot>
    </div>
    <div :class="ns.e('description')">
      <slot v-if="$slots.description" name="description" />
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" :class="ns.e('bottom')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { emptyProps, emptyEmits } from './empty';
import Default from './default-empty.vue';

const { create } = createComponent('Empty');

export default create({
  props: emptyProps,
  emits: emptyEmits,
  components: {
    Default
  },
  setup(props, { emit }) {
    const ns = useNamespace('empty');
    const imageStyle = computed<CSSProperties>(() => ({
      width: props.imageSize ? `${props.imageSize}px` : ''
    }));

    return {
      ns,
      imageStyle
    };
  }
});
</script>
