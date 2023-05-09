<template>
  <div :class="`${ns.b('group')}`">
    {{ name }}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef, toRefs } from 'vue';
import { buttonGroupProps } from './button-group';
import { ButtonGroupKey } from '../../../tokens';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
const { componentName, useGlobalConfig, create } = createComponent('ButtonGroup');

export default create({
  props: buttonGroupProps,

  setup(props) {
    provide(
      ButtonGroupKey,
      reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type')
      })
    );

    const ns = useNamespace('button');
    const { name } = toRefs(props);
    return {
      ns,
      name
    };
  }
});
</script>
