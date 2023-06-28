<template>
  <label
    class="l-radio-button"
    role="radio"
    :class="{
      [`l-radio-button--${radioSize || ''}`]: radioSize,
      'is-disabled': radioDisabled,
      'is-checked': modelValue === label,
      'is-bordered': border
    }"
    :aria-disabled="radioDisabled"
    :tabindex="tabIndex"
  >
    <span
      class="l-radio__input"
      :class="{
        'is-disabled': radioDisabled,
        'is-checked': modelValue === label
      }"
    >
      <span class="l-radio-buton__inner"></span>
      <input
        v-model="modelValue"
        class="l-radio-button__original"
        ref="radioRef"
        :value="label"
        type="radio"
        :name="nameValue"
        :disabled="radioDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        aria-hidden="true"
      />
    </span>
    <span
      class="l-radio-button__label"
      :class="{
        'is-disabled': radioDisabled,
        'is-checked': modelValue === label
      }"
      @keydown.stop
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { ref, toRefs, computed, nextTick, inject } from 'vue';
import { radioProps } from './radio';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
const { componentName, create } = createComponent('RadioButton');
export default create({
  components: {},
  props: radioProps,
  emits: [UPDATE_MODEL_EVENT, 'change'],
  directives: {},
  setup(props, context) {
    const { size, disabled, label, name } = toRefs(props);
    const radioRef = ref<HTMLInputElement>();
    const radioGroup: any = inject('radioGroupKey', undefined);
    const isGroup = computed(() => !!radioGroup);
    const modelValue = computed({
      get() {
        return isGroup.value ? radioGroup!.modelValue : props.modelValue!;
      },
      set(val) {
        if (isGroup.value) {
          radioGroup!.changeEvent(val);
        } else {
          context.emit(UPDATE_MODEL_EVENT, val);
        }
        radioRef.value!.checked = props.modelValue === props.label;
      }
    });
    const nameValue = name.value || ref('');
    const radioSize = computed(() => {
      return radioGroup ? radioGroup.size : size.value;
    });
    const radioDisabled = computed(() => {
      return radioGroup && radioGroup.disabled ? radioGroup.disabled : disabled.value;
    });
    const tabIndex = computed(() => {
      return radioDisabled.value || modelValue.value !== props.label ? -1 : 0;
    });
    const focus = ref(false);
    const handleChange = () => {
      nextTick(() => {
        context.emit('change', modelValue.value);
      });
    };
    return {
      componentName,
      radioDisabled,
      radioSize,
      focus,
      label,
      nameValue,
      modelValue,
      tabIndex,
      radioGroup,
      radioRef,
      handleChange
    };
  }
});
</script>
