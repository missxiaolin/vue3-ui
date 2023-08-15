<template>
  <div
    ref="root"
    :class="[
      'l-mention',
      type === 'textarea' ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize),
      nsInput.is('disabled', inputDisabled),
      nsInput.is('exceed', inputExceed),
      $attrs.class
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <component
      :is="tag"
      contenteditable
      ref="inputOrTextarea"
      :class="[type === 'textarea' ? nsTextarea.e('inner') : nsInput.e('inner')]"
      :disabled="inputDisabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur.stop="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    ></component>
    <!-- suffix slot -->
    <span v-if="suffixVisible" :class="nsInput.e('suffix')">
      <span :class="nsInput.e('suffix-inner')">
        <template v-if="!showClear || !isWordLimitVisible">
          <slot name="suffix"></slot>
          <l-icon v-if="suffixIcon" :class="nsInput.e('icon')" :icon="suffixIcon"></l-icon>
        </template>
        <l-icon
          v-if="showClear"
          :class="[nsInput.e('icon'), nsInput.e('clear')]"
          @mousedown.prevent
          icon="l-guanbi"
          @click="clear"
        ></l-icon>
        <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
          <span :class="nsInput.e('count-inner')">{{ textLength }} / {{ attrs.maxlength }}</span>
        </span>
      </span>
    </span>
    <!-- <slot name="menuItem" :row="props.members">11</slot> -->

    <l-mention-render ref="mention" />
  </div>
</template>
<script lang="ts">
import { watch, computed, onMounted, PropType, onBeforeUnmount, nextTick, useSlots, ref, unref, toRaw } from 'vue';
import MentionRender from './mention-render.vue';
import { useAttrs, useDisabled, useFormItem, useSize, useNamespace } from '../../../hooks';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { isKorean } from '../../../utils/isDef';
import { hasOwn } from '../../../utils/util';
import { Icon } from '../../../components/icon';
type TargetElement = HTMLInputElement | HTMLTextAreaElement;
import { mentionProps, mentionEmits } from './mention';
import createComponent from '../../../utils/create';
const { create } = createComponent('Mention');
export default create({
  components: {
    [MentionRender.name]: MentionRender,
    Icon
  },
  props: mentionProps,
  emits: mentionEmits,
  setup(props, { emit, slots, attrs: rawAttrs }) {
    const attrs = useAttrs();

    let root = ref<HTMLElement>(),
      mention = ref(),
      inputOrTextarea = ref(),
      trubuteExample = ref(null);
    const nsInput = useNamespace('mention-input');
    const nsTextarea = useNamespace('mention-textarea');
    const inputSize = useSize();
    const inputDisabled = useDisabled();
    const isComposing = ref(false);

    const focused = ref(false);
    const hovering = ref(false);

    const nativeInputValue = computed(() =>
      props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)
    );
    // const setNativeInputValue = () => {
    //     const input = inputOrTextarea.value.innerHTML;
    //     if (!input || input.value === nativeInputValue.value) return;
    //     inputOrTextarea.value.innerHTML = nativeInputValue.value;
    //     setFocus()
    // };
    // const setFocus = () => {
    //     inputOrTextarea.value.focus();
    //     let range = document.createRange();
    //     range.selectNodeContents(inputOrTextarea.value);
    //     range.collapse(false);
    //     let sel = window.getSelection();
    //     //判断光标位置，如不需要可删除
    //     if (sel.anchorOffset != 0) {
    //         return;
    //     };
    //     sel.removeAllRanges();
    //     sel.addRange(range);
    // };

    // watch(nativeInputValue, () => setNativeInputValue());

    const showClear = computed(
      () =>
        props.clearable &&
        !inputDisabled.value &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (focused.value || hovering.value)
    );
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!attrs.value.maxlength &&
        (props.type === 'input' || props.type === 'textarea') &&
        !inputDisabled.value &&
        !props.readonly
    );
    const textLength = computed(() => Array.from(nativeInputValue.value).length);
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength)
    );
    const suffixVisible = computed(
      () => !!slots.suffix || !!props.suffixIcon || showClear.value || isWordLimitVisible.value
    );

    const handleInput = (event: Event) => {
      let { innerText, innerHTML } = event.target as TargetElement;
      // 修复 type = bumber ,输入小数点未触发 handleDecimals 校验
      if (!innerText) {
        event.target.innerHTML = '';
      }
      if (isComposing.value) return;
      if (innerText === nativeInputValue.value) return;

      emit(UPDATE_MODEL_EVENT, innerHTML);
      emit('input', innerText);
      emit('update:text', innerText);
      handleUpdateMention();

      // nextTick(setNativeInputValue);
    };
    const handleUpdateInput = (event: Event) => {
      if (!inputOrTextarea.value) return;
      let { innerText, innerHTML } = inputOrTextarea.value;
      // 修复 type = bumber ,输入小数点未触发 handleDecimals 校验
      if (!innerText) {
        inputOrTextarea.value.innerHTML = '';
      }
      if (isComposing.value) return;
      if (innerText === nativeInputValue.value) return;

      emit(UPDATE_MODEL_EVENT, innerHTML);
      emit('input', innerText);
      emit('update:text', innerText);
      handleUpdateMention();

      // nextTick(setNativeInputValue);
    };
    const handleUpdateMention = () => {
      let { children } = inputOrTextarea.value;
      let mention: any = {
        to: [],
        follower: []
      };
      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        if (hasOwn(node.dataset, 'to')) {
          mention.to.push(node.dataset.to);
        } else if (hasOwn(node.dataset, 'follower')) {
          mention.follower.push(node.dataset.follower);
        }
      }
      mention.to = [...new Set(mention.to)];
      mention.follower = [...new Set(mention.follower)];
      emit('update:mention', mention);
    };
    const handleChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value);
    };

    const focus = () => {
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
    };

    const handleBlur = (event: FocusEvent) => {
      focused.value = false;
      emit('blur', event);
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
      inputOrTextarea.value.innerHTML = '';
      emit(UPDATE_MODEL_EVENT, '');
      emit('update:text', '');
      emit('change', '');
      emit('clear');
      emit('input', '');
    };
    onMounted(() => {
      // example of alternative callback
      // inputOrTextarea.value = root.value?.children[0] as any;
      if (!inputOrTextarea.value) {
        throw new Error('[l-mention] cannot find a suitable element to attach to.');
      }
      // inputOrTextarea.value.addEventListener('tribute-replaced', e => {
      //     e.target?.dispatchEvent(new Event('input', { bubbles: true }))
      // })
      nextTick(initialization);
    });
    const initialization = () => {
      if (!inputOrTextarea.value) return;
      inputOrTextarea.value.innerHTML = nativeInputValue.value;
      // 模版配置
      let collection = [];

      if (props.follower) {
        collection.push({
          trigger: '@@',
          members: props.members,
          key: props.key,
          value: props.value,
          selectTemplate: function ({ original = null }) {
            if (typeof original === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
              return `<span contenteditable="false" class="l-todo-follower" data-follower="${
                original[this.vue.value]
              }">@@${original[this.vue.key]}</span>`;
            }
            return '@@' + original[this.vue.key];
          },
          menuItemTemplate: function ({ original = null }) {
            if (typeof original === 'undefined') return null;
            return `<span contenteditable="false">${original[this.vue.key]}/${original[this.vue.value]}</span>
                                 <span>(${original[this.vue.post]})</span>`;
          },
          requireLeadingSpace: true,
          menuShowMinLength: 0,
          noMatchTemplate: null
        });
      }
      if (props.to) {
        collection.push({
          trigger: '@',
          members: props.members,
          key: props.key,
          value: props.value,
          selectTemplate: function ({ original = null }) {
            if (typeof original === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
              return `<span contenteditable="false" class="l-todo-to" data-to="${original[this.vue.value]}">@${
                original[this.vue.key]
              }</span>`;
            }

            return '@' + original[this.vue.key];
          },
          menuItemTemplate: function ({ original = null }) {
            if (typeof original === 'undefined') return null;
            return `<span contenteditable="false">${original[this.vue.key]}${
              original[this.vue.value] ? '/' + original[this.vue.value] : ''
            }</span>
                                 <span style="display:${original[this.vue.post] ? 'block' : 'none'}">(${
              original[this.vue.post]
            })</span>`;
          },
          requireLeadingSpace: true,
          noMatchTemplate: null,
          menuShowMinLength: 0
          // autocompleteMode: true
        });
      }
      let MentionClass = mention.value.getMention();
      trubuteExample = new MentionClass({
        collection,
        vue: toRaw({ ...props, update: handleUpdateInput })
        // containerClass: props.customClass
        // ? document.querySelector(`.${props.customClass}`)
        // : null

        // menuContainer: document.getElementById('content'),
      });
      setTimeout(() => {
        //
        trubuteExample.attach(inputOrTextarea.value);
        inputOrTextarea.value.tributeInstance = trubuteExample.value;
      }, 100);
    };

    const detachTribute = (el: any) => {
      if (!inputOrTextarea.value?.tributeInstance) return;

      inputOrTextarea.value.tributeInstance.detach(inputOrTextarea.value);
      inputOrTextarea.value.tributeInstance = undefined;
      delete inputOrTextarea.value.dataset.tribute;
    };

    onBeforeUnmount(() => {
      detachTribute(inputOrTextarea);
    });

    // watch(
    //     () => props.options,
    //     async newOptions => {
    //         if (inputOrTextarea.value?.tributeInstance) {
    //             await nextTick()
    //             detachTribute(el)
    //             await nextTick()
    //             attachTribute(el, { ...newOptions })
    //         }
    //     },
    //     { deep: true }
    // )
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
    return {
      root,
      props,
      inputDisabled,
      hovering,
      isWordLimitVisible,
      inputExceed,
      textLength,
      showClear,
      suffixVisible,
      mention,
      trubuteExample,
      inputOrTextarea,
      nsInput,
      inputSize,
      nsTextarea,

      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      clear,
      focus,
      blur,
      onMouseLeave,
      onMouseEnter,
      handleKeydown
    };
  }
});
</script>
