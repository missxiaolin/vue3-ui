<template>
  <label
    class="l-radio"
    role="radio"
    :class="{
      [`l-radio--${radioSize || ''}`]: radioSize,
      'is-disabled': radioDisabled,
      'is-checked': modelValue === label,
      'is-bordered': border
    }"
    :aria-disabled="radioDisabled"
    :tabindex="tabIndex"
  >
    <span
      v-show="dot"
      class="l-radio__input"
      :class="{
        'is-disabled': radioDisabled,
        'is-checked': modelValue === label
      }"
    >
      <span class="l-radio__inner"></span>
      <input
        v-model="modelValue"
        class="l-radio__original"
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
      class="l-radio__label"
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
import { ref, toRefs, computed, nextTick, inject } from 'vue';
import createComponent from '../../../utils/create';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { radioProps } from './radio';

const { create, componentName } = createComponent('Radio');

export default create({
  components: {},
  props: radioProps,
  directives: {},
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, { emit }) {
    const radioRef = ref<HTMLInputElement>();
    const focus = ref(false);
    const { size, disabled, label, name, border, dot } = toRefs(props);
    const modelValue = computed({
      get() {
        return props.modelValue!;
      },
      set(val) {
        emit(UPDATE_MODEL_EVENT, val);
        radioRef.value!.checked = props.modelValue === props.label;
      }
    });
    const nameValue = name.value || ref('');
    const radioSize = computed(() => {
      return size.value;
    });
    const radioDisabled = computed(() => {
      return disabled.value;
    });

    const handleChange = () => {
      nextTick(() => {
        emit('change', modelValue.value);
      });
    };
    const tabIndex = computed(() => {
      return radioDisabled.value || modelValue.value !== props.label ? -1 : 0;
    });
    return {
      componentName,
      radioDisabled,
      radioSize,
      focus,
      label,
      dot,
      nameValue,
      modelValue,
      tabIndex,
      radioRef,
      border,
      handleChange
    };
  }
});
</script>
