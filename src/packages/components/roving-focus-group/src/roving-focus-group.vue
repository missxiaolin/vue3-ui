<template>
  <focus-group-collection>
    <roving-focus-group-impl v-bind="$attrs">
      <slot />
    </roving-focus-group-impl>
  </focus-group-collection>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RovingFocusGroupImpl from './roving-focus-group-impl.vue';
import { ECollection as FocusGroupCollection } from './roving-focus-group';

import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('RovingFocusGroup');
export default create({
  components: {
    FocusGroupCollection,
    RovingFocusGroupImpl
  }
});
</script>
