<template>
  <div :class="containerKls">
    <!-- icon & line -->
    <div :class="[ns.e('head'), ns.is(currentStatus)]"> </div>
    <!-- title & description -->
    <div :class="ns.e('main')">
      <div :class="[ns.e('title'), ns.is(currentStatus)]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isSimple" :class="ns.e('arrow')" />
      <div v-else :class="[ns.e('description'), ns.is(currentStatus)]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  CSSProperties,
  Ref,
  toRefs
} from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { StepProps } from './step';
const { create } = createComponent('Step');

export interface IStepsProps {
  space: number | string;
  active: number;
  direction: string;
  alignCenter: boolean;
  simple: boolean;
  finishStatus: string;
  processStatus: string;
}

export interface StepItemState {
  uid: number | undefined;
  currentStatus: string;
  setIndex: (val: number) => void;
  calcProgress: (status: string) => void;
}

export interface IStepsInject {
  props: IStepsProps;
  steps: Ref<StepItemState[]>;
}

export default create({
  props: StepProps,
  setup(props) {
    const internalStatus = ref('');
    const parent = inject('lSteps') as IStepsInject;
    const ns = useNamespace('step');
    const { title } = toRefs(props)

    const containerKls = computed(() => {
      return [ns.b()];
    });

    const currentStatus = computed(() => {
      return props.status || internalStatus.value;
    });
    return {
      ns,
      containerKls,
      currentStatus,
      title
    };
  }
});
</script>
