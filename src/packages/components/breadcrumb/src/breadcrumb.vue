<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script lang="ts">
import { provide } from 'vue';
import { breadcrumbKey } from '../../../tokens/breadcrumb';
import { useNamespace } from '../../../hooks';
import { breadcrumbProps } from './breadcrumb';

import createComponent from '../../../utils/create';
const { create, componentName } = createComponent('Breadcrumb');

export default create({
  components: {},
  props: breadcrumbProps,
  setup(props, { emit }) {
    const ns = useNamespace('breadcrumb');
    provide(breadcrumbKey, props);
    return { ns, componentName };
  }
});
</script>
