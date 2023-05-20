<template>
  <div :class="containerKls" :style="style">
    <!-- icon & line -->
    <div :class="[ns.e('head'), ns.is(currentStatus)]">
      <div v-if="!isSimple" :class="ns.e('line')">
        <i :class="ns.e('line-inner')" :style="lineStyle" />
      </div>
      <div :class="[ns.e('icon'), ns.is(icon || $slots.icon ? 'icon' : 'text')]">
        <icon v-if="icon" :class="ns.e('icon-inner')"></icon>
        <icon
          v-else-if="currentStatus === 'success'"
          :class="['l-chenggong', ns.e('icon-inner'), ns.is('status')]"
        ></icon>
        <icon
          v-else-if="currentStatus === 'error'"
          :class="['l-cuowuguanbishibai', ns.e('icon-inner'), ns.is('status')]"
        ></icon>
        <div v-else-if="!isSimple" :class="ns.e('icon-inner')">
          {{ index + 1 }}
        </div>
      </div>
    </div>
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
import { Icon } from '../../icon/index';
import { isNumber } from '@vueuse/core';

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
  components: {
    Icon
  },
  props: StepProps,
  setup(props) {
    const internalStatus = ref('');
    const lineStyle = ref({});
    const parent = inject('lSteps') as IStepsInject;
    const ns = useNamespace('step');
    const currentInstance = getCurrentInstance();
    const index = ref(-1);
    const { title, description, icon, status } = toRefs(props);

    const setIndex = (val: number) => {
      index.value = val;
    };

    const calcProgress = (status: string) => {
      const isWait = status === 'wait';
      const style: CSSProperties = {
        transitionDelay: `${isWait ? '-' : ''}${150 * index.value}ms`
      };
      const step = status === parent.props.processStatus || isWait ? 0 : 100;

      style.borderWidth = step && !isSimple.value ? '1px' : 0;
      style[parent.props.direction === 'vertical' ? 'height' : 'width'] = `${step}%`;
      lineStyle.value = style;
    };

    const containerKls = computed(() => {
      return [
        ns.b(),
        ns.is(isSimple.value ? 'simple' : parent.props.direction),
        ns.is('flex', isLast.value && !space.value && !isCenter.value),
        ns.is('center', isCenter.value && !isVertical.value && !isSimple.value)
      ];
    });

    const currentStatus = computed(() => {
      console.log(props.status || internalStatus.value);
      return props.status || internalStatus.value;
    });

    const isSimple = computed(() => {
      return parent.props.simple;
    });

    const space = computed(() => {
      return isSimple.value ? '' : parent.props.space;
    });

    const stepsCount = computed(() => {
      return parent.steps.value.length;
    });

    const isCenter = computed(() => {
      return parent.props.alignCenter;
    });

    const isVertical = computed(() => {
      return parent.props.direction === 'vertical';
    });

    const isLast = computed(() => {
      return parent.steps.value[stepsCount.value - 1]?.uid === currentInstance?.uid;
    });

    const style = computed(() => {
      const style: CSSProperties = {
        flexBasis: isNumber(space.value)
          ? `${space.value}px`
          : space.value
          ? space.value
          : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value) return style;
      if (isLast.value) {
        style.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style;
    });

    const stepItemState = reactive({
      uid: computed(() => currentInstance?.uid),
      currentStatus,
      setIndex,
      calcProgress
    });

    parent.steps.value = [...parent.steps.value, stepItemState];

    const prevStatus = computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    });

    const updateStatus = (activeIndex: number) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevStatus.value !== 'error') {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = 'wait';
      }
      const prevChild = parent.steps.value[index.value - 1];
      if (prevChild) prevChild.calcProgress(internalStatus.value);
    };

    onMounted(() => {
      watch(
        [() => parent.props.active, () => parent.props.processStatus, () => parent.props.finishStatus],
        ([active]) => {
          updateStatus(active);
        },
        { immediate: true }
      );
    });
    return {
      ns,
      style,
      lineStyle,
      isSimple,
      containerKls,
      currentStatus,
      title,
      description,
      icon,
      index
    };
  }
});
</script>
