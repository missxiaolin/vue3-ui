<template>
  <label
    :class="[
      'l-checkbox',
      { 'is-checked': isChecked },
      { 'is-disabled': isDisabled },
      { 'is-bordered': isBordered },
      checkboxSize ? 'l-checkbox--' + checkboxSize : ''
    ]"
  >
    <span :class="['l-checkbox__inner', { 'is-indeterminate': indeterminate }]">
      <!-- 这个是自定义的选择框 -->
      <span :class="['l-checkbox__input', { 'is-disabled': isDisabled }]"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        class="l-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <input
        v-else
        v-model="model"
        class="l-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        :tabindex="tabindex"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span class="l-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script lang="ts">
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { ref, toRefs, computed, inject, watch, onMounted } from 'vue';
import createComponent from '../../..//utils/create';
import { checkboxProps } from './checkbox';
const { create } = createComponent('Checkbox');
export default create({
  components: {},
  props: checkboxProps,
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue! ?? ref(false);
      },
      set(val: unknown) {
        emit(UPDATE_MODEL_EVENT, val);
      }
    });
    const isChecked = computed<boolean>(() => {
      const value = model.value;
      if (Array.isArray(value)) {
        return value.includes(props.label);
      } else {
        return !!value;
      }
    });
    const isDisabled = computed(() => {
      return props.disabled!;
    });

    const isBordered = computed(() => {
      return props.border!;
    });

    const checkboxSize = computed(() => {
      const temCheckboxSize = props.size;
      return temCheckboxSize;
    });

    const handleChange = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const value = target.checked ? props.trueLabel ?? true : props.falseLabel ?? false;
      emit('change', value);
    };
    return {
      ...toRefs(props),
      model,
      checkboxSize,
      isDisabled,
      isBordered,
      handleChange,
      isChecked
    };
  }
});
</script>
