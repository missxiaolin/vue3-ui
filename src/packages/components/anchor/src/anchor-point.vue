<template>
  <a :href="`#${href}`" :id="`${href}`" :class="[ns.b()]"></a>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { anchorPointProps, anchorPointEmits } from './anchor-point';
const { create } = createComponent('AnchorPoint');

export default create({
  components: {},
  props: anchorPointProps,
  emits: anchorPointEmits,
  setup(props) {
    const ns = useNamespace('anchor-point');
    let { href } = toRefs(props);

    return {
      ns,
      href
    };
  }
});
</script>
