<template>
  <div>
    {{ name }}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef, toRefs } from 'vue';
import { buttonGroupProps } from './button-group';

import createComponent from '../../../utils/create';
const { componentName, useGlobalConfig, create } = createComponent('ButtonGroup');
export default create({
  props: buttonGroupProps,

  setup(props) {
    
  }
});
</script>
