<template>
    <div>
        文本省略 0%
    </div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, useGlobalConfig, create } = createComponent('Button');

export default create({
  setup() {
    return {
      componentName,
    };
  }
});
</script>