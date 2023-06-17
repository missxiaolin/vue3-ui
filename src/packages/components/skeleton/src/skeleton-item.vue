<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <icon v-if="variant === 'image'" icon="l-tupian"></icon>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import createComponent from '../../../utils/create';
const { create } = createComponent('SkeletonItem');
import { skeletonItemProps } from './skeleton-item';
import { Icon } from '../../icon/index'

import { useNamespace } from '../../../hooks';
export default create({
  components: {
    Icon
  },
  name: '',
  props: skeletonItemProps,
  setup(props) {
    const { variant } = toRefs(props);
    const ns = useNamespace('skeleton');

    return {
      ns,
      variant
    };
  }
});
</script>
