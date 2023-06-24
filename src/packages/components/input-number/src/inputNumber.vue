<template>
  <div
    :class="[
      'l-input-number',
      { 'is-disabled': inputDisabled },
      size ? 'l-input-number--' + size : '',
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]"
    @dragstart.prevent
  >
    <span
      v-if="controls"
      @keydown.enter="decrease"
      v-repeat-click:[clickTime]="decrease"
      :class="['l-input-number__decrease', { 'is-disabled': minDisabled }]"
    >
      <icon icon="l-jianshao"></icon>
    </span>
    <span
      v-if="controls"
      @keydown.enter="increase"
      v-repeat-click:[clickTime]="increase"
      :class="['l-input-number__increase', { 'is-disabled': maxDisabled }]"
    >
      <icon icon="l-zengjia"></icon>
    </span>
    <l-input
      ref="input"
      :disabled="inputDisabled"
      v-model="numberValue"
      @input="handleInput"
      @blur="(event) => $emit('blur', event)"
      @focus="(event) => $emit('focus', event)"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @change="handleInputChange"
    ></l-input>
  </div>
</template>
<script lang="ts">
import { ref, toRefs, computed, reactive, watch, onMounted } from 'vue';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import createComponent from '../../../utils/create';
import { Input } from '../../../components/input';
import { Icon } from '../../../components/icon';
import { RepeatClick } from '../../../directives';
import { isNumber, checkNumber, inputNumberProps } from './inputNumber';
const { create } = createComponent('InputNumber');
import type { ComponentPublicInstance } from 'vue';
interface IData {
  currentValue: number;
  userInput: null | number | string;
}
export default create({
  components: {
    Icon,
    [Input.name]: Input
  },
  props: inputNumberProps,
  emits: {
    change: (prev: number, cur: number) => prev !== cur,
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    input: (val: number) => isNumber(val),
    'update:modelValue': (val: number) => isNumber(val)
  },
  directives: {
    RepeatClick
  },
  setup(props, context) {
    const input: any = ref();
    const data = reactive<IData>({
      currentValue: props!.modelValue,
      userInput: null
    });
    const inputDisabled = props.disabled;
    const minDisabled = computed(() => _decrease(props.modelValue) < props.min);
    const maxDisabled = computed(() => _increase(props.modelValue) > props.max);
    const numberValue = computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue: number | string = data.currentValue;
      if (Number.isNaN(currentValue)) return '';
      if (props.precision !== undefined) {
        currentValue = currentValue.toFixed(props.precision);
      }
      return currentValue;
    });
    // 增加
    const _increase = (val: number) => {
      if (!isNumber(val)) return data.currentValue;
      const precisionFactor = Math.pow(10, numPrecision.value);
      val = isNumber(val) ? val : NaN;
      return toPrecision((precisionFactor * val + precisionFactor * props.step) / precisionFactor);
    };
    // 减少
    const _decrease = (val: number) => {
      if (!isNumber(val)) return data.currentValue;
      const precisionFactor = Math.pow(10, numPrecision.value);
      val = isNumber(val) ? val : NaN;
      return toPrecision((precisionFactor * val - precisionFactor * props.step) / precisionFactor);
    };
    const increase = () => {
      if (inputDisabled || maxDisabled.value) return;
      const value = props.modelValue || 0;
      const newVal = _increase(value);
      setCurrentValue(newVal);
    };
    const decrease = () => {
      if (inputDisabled || minDisabled.value) return;
      const value = props.modelValue || 0;
      const newVal = _decrease(value);
      setCurrentValue(newVal);
    };
    // 监听input
    const handleInput = (value: string) => {
      if (checkNumber(value) || !value) {
        return (data.userInput = value);
      }
    };
    // 获取精度
    const getPrecision = (value: number | undefined) => {
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };
    // 精度数计算
    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (props.precision !== undefined) {
        if (stepPrecision > props.precision) {
          console.warn('InputNumber', 'precision should not be less than the decimal places of step');
        }
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    // 精度转化
    const toPrecision = (num: number, pre?: number) => {
      if (pre === undefined) pre = numPrecision.value;
      return parseFloat(`${Math.round(num * Math.pow(10, pre)) / Math.pow(10, pre)}`);
    };
    // 整合数值，向外抛出
    const setCurrentValue = (newVal: number) => {
      const oldVal = data.currentValue;
      if (typeof newVal === 'number' && props.precision !== undefined) {
        newVal = toPrecision(newVal, props.precision);
      }
      if (newVal !== undefined && newVal >= props.max) newVal = props.max;
      if (newVal !== undefined && newVal <= props.min) newVal = props.min;
      if (oldVal === newVal) return;
      if (!isNumber(newVal)) {
        newVal = NaN;
      }
      data.userInput = null;
      context.emit(UPDATE_MODEL_EVENT, newVal);
      context.emit('input', newVal);
      context.emit('change', newVal, oldVal);
      data.currentValue = newVal;
    };
    const handleInputChange = (value: string) => {
      const newVal = Number(value);
      if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
        setCurrentValue(newVal);
      }
      data.userInput = null;
    };
    const focus = () => input.value?.focus?.();
    const blur = () => input.value?.blur?.();
    const controlsAtRight = computed(() => props.controls && props.controlsRight);
    watch(
      () => props.modelValue,
      (value) => {
        let newVal = Number(value);
        if (newVal !== undefined) {
          if (isNaN(newVal)) return;
          if (props.stepStrictly) {
            const stepPrecision = getPrecision(props.step);
            const precisionFactor = Math.pow(10, stepPrecision);
            newVal = (Math.round(newVal / props.step) * precisionFactor * props.step) / precisionFactor;
          }
          if (props.precision !== undefined) {
            newVal = toPrecision(newVal, props.precision);
          }
        }
        if (newVal !== undefined && newVal >= props.max) {
          newVal = props.max;
          context.emit(UPDATE_MODEL_EVENT, newVal);
        }
        if (newVal !== undefined && newVal <= props.min) {
          newVal = props.min;
          context.emit(UPDATE_MODEL_EVENT, newVal);
        }
        data.currentValue = newVal;
        data.userInput = null;
      },
      { immediate: true }
    );
    onMounted(() => {
      const innerInput = input.value?.input as HTMLInputElement;
      if (!isNumber(props.modelValue)) {
        context.emit(UPDATE_MODEL_EVENT, Number(props.modelValue));
      }
    });
    return {
      ...toRefs(props),
      controlsAtRight,
      inputDisabled,
      numberValue,
      decrease,
      maxDisabled,
      minDisabled,
      increase,
      handleInput,
      handleInputChange,
      focus,
      blur
    };
  }
});
</script>
