<template>
  <div
    class="l-switch"
    :class="{ 'is-checked': checked }"
    :style="{ '--l-switch-witdh': width, '--l-switch-active-color': activeColor }"
  >
    <input
      class="l-switch__input"
      ref="input"
      type="checkbox"
      :checked="checked"
      @change="handleInput"
      :true-value="trueValue"
      :false-value="falseValue"
    />
    <span class="l-switch_action"></span>
  </div>
</template>

<script lang="ts">
import { computed, ref, nextTick } from 'vue';
import createComponent from '../../../../utils/create';
const { create } = createComponent('VideoSwitch');

export default create({
  props: {
    modelValue: {
      //绑定值，必须等于active-value或inactive-value，默认为Boolean类型
      type: [Number, String, Boolean]
    },
    width: {
      //switch 的宽度（像素）
      type: String,
      default: '40px'
    },
    trueValue: {
      //switch 打开时的值
      type: [Number, String, Boolean],
      default: true
    },
    falseValue: {
      //	switch 关闭时的值
      type: [Number, String, Boolean],
      default: true
    },
    activeColor: {
      //switch 打开时的背景色
      type: [String],
      default: '#409EFF'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const input: any = ref(null);
    const checked = computed(() => {
      return props.modelValue === props.trueValue;
    });
    const handleInput = (): void => {
      nextTick(() => {
        const val = input.value.checked;
        emit('update:modelValue', val);
        emit('change', val);
      });
    };

    return { input, checked, handleInput, ...props };
  }
});
</script>
