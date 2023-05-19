<template>
  <div> </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { StepProps } from './step'
const { create } = createComponent('Step');

export default create({
  props: StepProps,
  setup(props) {

  }
})

</script>
