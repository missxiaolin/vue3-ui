<template>
  <div
    v-show="type !== 'hidden'"
    :class="[
      type === 'textarea' ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize),
      nsInput.is('disabled', inputDisabled),
      nsInput.is('exceed', inputExceed),
      {
        [nsInput.b('group')]: $slots.prepend || $slots.append,
        [nsInput.bm('group', 'append')]: $slots.append,
        [nsInput.bm('group', 'prepend')]: $slots.prepend,
        [nsInput.m('prefix')]: $slots.prefix || prefixIcon,
        [nsInput.m('suffix')]: $slots.suffix || suffixIcon || clearable || showPassword,
        [nsInput.m('suffix--password-clear')]: showClear && showPwdVisible
      },
      labelInsideClass,
      $attrs.class
    ]"
    :style="containerStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <label v-if="label" :class="[labelClass]">{{ label }}</label>
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" :class="nsInput.be('group', 'prepend')" :style="prependStyle">
        <slot name="prepend" />
      </div>

      <input
        ref="input"
        :class="nsInput.e('inner')"
        v-bind="attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="label && !labelClass ? '' : placeholder"
        :style="inputStyle"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur.stop="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />

      <!-- prefix slot -->
      <span v-if="$slots.prefix || prefixIcon" :class="nsInput.e('prefix')">
        <span :class="nsInput.e('prefix-inner')">
          <slot name="prefix"></slot>
          <icon v-if="prefixIcon" :class="nsInput.e('icon')" :icon="prefixIcon"></icon>
        </span>
      </span>

      <!-- suffix slot -->
      <span v-if="suffixVisible" :class="nsInput.e('suffix')">
        <span :class="nsInput.e('suffix-inner')">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <icon v-if="suffixIcon" :class="nsInput.e('icon')" :icon="suffixIcon"></icon>
          </template>
          <icon
            v-if="showClear"
            :class="[nsInput.e('icon'), nsInput.e('clear')]"
            @mousedown.prevent
            icon="l-guanbi"
            @click="clear"
          >
          </icon>
          <icon
            v-if="showPwdVisible"
            :class="[nsInput.e('icon'), nsInput.e('clear')]"
            :icon="pwdIcon"
            @click="handlePasswordVisible"
          >
          </icon>
          <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
            <span :class="nsInput.e('count-inner')">{{ textLength }} / {{ attrs.maxlength }}</span>
          </span>
        </span>
        <icon
          v-if="validateState && validateIcon && needStatusIcon"
          :class="[nsInput.e('icon'), nsInput.e('validateIcon')]"
          :icon="validateIcon"
        ></icon>
      </span>

      <!-- append slot -->
      <div v-if="$slots.append" :class="nsInput.be('group', 'append')" :style="appendStyle">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textarea"
        :class="[nsTextarea.e('inner')]"
        v-bind="attrs"
        :tabindex="tabindex"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="computedTextareaStyle"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span v-if="isWordLimitVisible" :class="nsInput.e('count')">{{ textLength }} / {{ attrs.maxlength }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  ref,
  shallowRef,
  onMounted,
  onUpdated,
  toRaw
} from 'vue';
import { hasOwn } from '../../../utils/util';
import { isClient } from '@vueuse/core';
import { Icon } from '../../../components/icon';
let ValidateComponentsMap = {
  validating: 'Loading',
  success: 'CircleCheck',
  error: 'CircleClose'
};

import { isObject } from '../../../utils/util';
import { isKorean } from '../../../utils/isDef';
import { useAttrs, useDisabled, useFormItem, useSize, useNamespace } from '../../../hooks';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { calcTextareaHeight } from './calc-textarea-height';
import { inputProps, inputEmits } from './input';

import type { StyleValue } from 'vue';

type TargetElement = HTMLInputElement | HTMLTextAreaElement;

const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend'
} as const;

import createComponent from '../../../utils/create';
const { create, useGlobalConfig } = createComponent('Input');

export default create({
  components: { Icon },

  inheritAttrs: false,

  props: inputProps,
  emits: inputEmits,

  setup(props, { slots, emit, attrs: rawAttrs }) {
    const instance = getCurrentInstance()!;
    const attrs = useAttrs();

    const { form, formItem } = useFormItem();
    const inputSize = useSize();
    const inputDisabled = useDisabled();
    const nsInput = useNamespace('input');
    const nsTextarea = useNamespace('textarea');

    const input = ref<HTMLInputElement>();
    const textarea = ref<HTMLTextAreaElement>();
    const focused = ref(false);
    const hovering = ref(false);
    const isComposing = ref(false);
    const passwordVisible = ref(false);
    const _textareaCalcStyle = shallowRef(props.inputStyle);
    let labelClass = ref('');

    const inputOrTextarea = computed(() => input.value || textarea.value);

    const needStatusIcon = computed(() => form?.statusIcon ?? false);
    const validateState = computed(() => formItem?.validateState || '');
    const validateIcon = computed(() => ValidateComponentsMap[validateState.value]);
    const containerStyle = computed(() => rawAttrs.style as StyleValue);
    const computedTextareaStyle = computed<StyleValue>(() => [
      props.inputStyle,
      _textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const pwdIcon = computed(() => (!passwordVisible.value ? 'l-yincang' : 'l-xianshi_huaban'));

    const nativeInputValue = computed(() =>
      props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)
    );
    const showClear = computed(
      () =>
        props.clearable &&
        !inputDisabled.value &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (focused.value || hovering.value)
    );
    const showPwdVisible = computed(
      () => props.showPassword && !inputDisabled.value && !props.readonly && (!!nativeInputValue.value || focused.value)
    );
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!attrs.value.maxlength &&
        (props.type === 'text' || props.type === 'textarea') &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword
    );
    const textLength = computed(() => Array.from(nativeInputValue.value).length);
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength)
    );

    const resizeTextarea = () => {
      const { type, autosize } = props;

      if (!isClient || type !== 'textarea') return;

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined;
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined;
        _textareaCalcStyle.value = {
          ...calcTextareaHeight(textarea.value!, minRows, maxRows)
        };
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value!).minHeight
        };
      }
    };

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      if (!input || input.value === nativeInputValue.value) return;
      input.value = nativeInputValue.value;
    };

    const calcIconOffset = (place: 'prefix' | 'suffix') => {
      const { el } = instance.vnode;
      if (!el) return;
      const elList: HTMLSpanElement[] = Array.from(el.querySelectorAll(`.${nsInput.e(place)}`));
      const target = elList.find((item) => item.parentNode === el);

      if (!target) return;

      const pendant = PENDANT_MAP[place];

      if (slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          el.querySelector(`.${nsInput.be('group', pendant)}`).offsetWidth
        }px)`;
      } else {
        target.removeAttribute('style');
      }
    };

    const updateIconOffset = () => {
      calcIconOffset('prefix');
      calcIconOffset('suffix');
    };
    const handleInput = (event: Event) => {
      const { type } = props;
      // if (!isClient || type !== 'textarea') return;
      let { value } = event.target as TargetElement;
      // 修复 type = bumber ,输入小数点未触发 handleDecimals 校验
      if (!value) {
        event.target.value = '';
      }
      if (isComposing.value) return;
      if (value === nativeInputValue.value) return;
      if (type === 'number' && value) {
        value = handleDecimals(value);
      }
      try {
        if (type !== 'textarea') {
          value = value.trim();
        }
      } catch (error) {}
      if (props.modelModifiers.phone) {
        // 非1开头无法输入
        value = value.startsWith('1') ? value : '';
        // 非数字置为空
        value = value.replace(/\D/g, '').substring(0, 11);
        if (event.target) {
          (event.target as TargetElement).value = value;
        }
      }
      emit(UPDATE_MODEL_EVENT, value);
      emit('input', value);

      nextTick(setNativeInputValue);
    };

    /**
     * @function 带小数点的数字输入框
     * **/
    const handleDecimals = (val: string | number) => {
      let str = String(val);
      if (props.integer || hasOwn(attrs, 'integer')) {
        str = str.replace(/[^\d]/g, ''); //清除“数字”以外的字符
        str = str.substring(0, Number(attrs.value.maxlength) || 10);
      } else {
        str = str.replace(/[^\d.]/g, ''); //清除“数字”和“.”以外的字符
        str = str.replace(/^\./g, ''); //验证第一个字符是数字而不是.
        str = str.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的.
        str = str.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        const reg = `^(\\d+)\\.(\\d{${props.decimalsDigit}}).*$`;
        // 保留n位小数
        str = str.replace(new RegExp(reg), '$1.$2');
      }
      return str;
    };

    const handleChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value);
    };

    const focus = () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      nextTick(() => {
        inputOrTextarea.value?.focus();
      });
    };

    const blur = () => {
      inputOrTextarea.value?.blur();
    };

    const handleFocus = (event: FocusEvent) => {
      focused.value = true;
      emit('focus', event);
      // label字段 吸顶
      // labelClass.value = 'label-adsorbent-top';
    };

    const handleBlur = (event: FocusEvent) => {
      focused.value = false;
      emit('blur', event);
      if (props.validateEvent) {
        formItem?.validate?.('blur');
      }
      // // label字段 吸顶
      // const { value } = event.target as TargetElement;
      // labelClass.value = (value && 'label-adsorbent-top') || '';
    };

    const select = () => {
      inputOrTextarea.value?.select();
    };

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event);
      isComposing.value = true;
    };

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event);
      const text = (event.target as HTMLInputElement)?.value;
      const lastCharacter = text[text.length - 1] || '';
      isComposing.value = !isKorean(lastCharacter);
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event);
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };

    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '');
      emit('change', '');
      emit('clear');
      emit('input', '');
    };

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };

    const suffixVisible = computed(
      () =>
        !!slots.suffix ||
        !!props.suffixIcon ||
        showClear.value ||
        props.showPassword ||
        isWordLimitVisible.value ||
        (!!validateState.value && needStatusIcon.value)
    );

    watch(
      () => props.modelValue,
      () => {
        nextTick(resizeTextarea);
        if (props.validateEvent) {
          formItem?.validate?.('change');
        }
      }
    );

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => setNativeInputValue());

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(
      () => props.type,
      () => {
        nextTick(() => {
          setNativeInputValue();
          resizeTextarea();
          updateIconOffset();
        });
      }
    );

    onMounted(() => {
      setNativeInputValue();
      updateIconOffset();
      nextTick(resizeTextarea);

      // console.log('slots----', toRaw(slots), slots.append ? slots.append : '---');
    });

    onUpdated(() => {
      nextTick(updateIconOffset);
    });

    const onMouseLeave = (evt: MouseEvent) => {
      hovering.value = false;
      emit('mouseleave', evt);
    };

    const onMouseEnter = (evt: MouseEvent) => {
      hovering.value = true;
      emit('mouseenter', evt);
    };

    const handleKeydown = (evt: KeyboardEvent) => {
      emit('keydown', evt);
    };
    const labelInsideClass = computed(() => {
      labelClass.value = 'label-adsorbent-top';
      return props.label && `l-input-inside-label`;
    });

    return {
      input,
      textarea,
      attrs,
      inputSize,
      validateState,
      validateIcon,
      containerStyle,
      computedTextareaStyle,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      suffixVisible,
      needStatusIcon,
      pwdIcon,
      labelInsideClass,
      labelClass,

      resizeTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      onMouseLeave,
      onMouseEnter,
      handleKeydown,

      nsInput,
      nsTextarea
    };
  }
});
</script>
