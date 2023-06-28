<template>
  <div
    ref="radioGroupRef"
    :class="['l-radio-group', direction == 'vertical' ? 'l-radio-group-vertical' : '']"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, nextTick, provide, reactive, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { radioGroupProps } from './radioGroup';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';

const { create, componentName } = createComponent('RadioGroup');

export default create({
  components: {},
  props: radioGroupProps,
  emits: [UPDATE_MODEL_EVENT, 'change'],
  directives: {},
  setup(props, context) {
    const modelValue = ref(props.modelValue);
    const direction = ref(props.direction);
    const changeEvent = (modelValue: any) => {
      context.emit(UPDATE_MODEL_EVENT, modelValue);
      nextTick(() => context.emit('change', modelValue));
    };
    provide(
      'radioGroupKey',
      reactive({
        ...toRefs(props),
        changeEvent
      })
    );
    const radioGroupRef = ref<HTMLDivElement>();
    const model = computed({
      get() {
        return modelValue.value;
      },
      set(value: any) {
        context.emit(UPDATE_MODEL_EVENT, value);
      }
    });
    onMounted(() => {
      const radios = radioGroupRef.value!.querySelectorAll<HTMLInputElement>('[type=radio]');
      const firstLabel = radios[0];
      if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    });
    return {
      componentName,
      radioGroupRef,
      model,
      direction
    };
  }
});
</script>
