<template>
    <div>
        文本省略 0%
    </div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, useGlobalConfig, create } = createComponent('Ellipsis');

export default create({
  emits: ['clickAction'],
  setup(props, { emit }) {
    
    return {
      componentName,
    };
  }
});
</script>