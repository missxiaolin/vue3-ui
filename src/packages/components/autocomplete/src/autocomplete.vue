<template>
  <l-tooltip
    ref="popper"
    v-model:visible="suggestionVisible"
    :placement="placement"
    :fallback-placements="['bottom-start', 'top-start']"
    :popper-class="`${ns.e('popper')} ${popperClass}`"
    :teleported="compatTeleported"
    :gpu-acceleration="false"
    pure
    manual-mode
    effect="light"
    trigger="click"
    :transition="`${ns.namespace.value}-zoom-in-top`"
    persistent
    @show="onSuggestionShow"
  >
    <div
      v-clickoutside="close"
      :class="[ns.b(), $attrs.class]"
      :style="$attrs.style"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="suggestionVisible"
      :aria-owns="id"
    >
      <l-input
        ref="inputRef"
        v-bind="attrs"
        :model-value="modelValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @keydown.up.prevent="highlight(highlightedIndex - 1)"
        @keydown.down.prevent="highlight(highlightedIndex + 1)"
        @keydown.enter="handleKeyEnter"
        @keydown.tab="close"
      >
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-if="$slots.append" #append>
          <slot name="append"></slot>
        </template>
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix"></slot>
        </template>
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix"></slot>
        </template>
      </l-input>
    </div>
    <template #content>
      <div
        ref="regionRef"
        :class="[ns.b('suggestion'), ns.is('loading', suggestionLoading)]"
        :style="{ minWidth: dropdownWidth, outline: 'none' }"
        role="region"
      >
        <l-scroll
          :id="id"
          tag="ul"
          max-height="300px"
          :wrap-class="ns.be('suggestion', 'wrap')"
          :view-class="ns.be('suggestion', 'list')"
          role="listbox"
        >
          <li v-if="suggestionLoading">
            <l-icon class="is-loading" icon="l-icon-loading"></l-icon>
          </li>
          <template v-else>
            <li
              v-for="(item, index) in suggestions"
              :id="`${id}-item-${index}`"
              :key="index"
              :class="{ highlighted: highlightedIndex === index }"
              role="option"
              :aria-selected="highlightedIndex === index"
              @click="select(item)"
            >
              <slot :item="item">{{ item[valueKey] }}</slot>
            </li>
            <slot name="bottom"></slot>
          </template>
        </l-scroll>
      </div>
    </template>
  </l-tooltip>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue';
import { NOOP } from '@vue/shared';
import { debounce } from 'lodash';
import { useAttrs, useNamespace } from '../../../hooks';
import { ClickOutside } from '../../../directives';
import { generateId, isArray } from '../../../utils/util';
import { throwError } from '../../../utils/error';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { Input } from '../../../components/input';
import { Scroll } from '../../../components/scroll';
import { Tooltip } from '../../../components/tooltip';
import { useTooltipContentProps } from '../../../components/tooltip';
import { useDeprecateAppendToBody } from '../../../components/popper';
import { Icon } from '../../../components/icon';

import type { Placement } from '../../../components/popper';
import type { PropType } from 'vue';

import createComponent from '../../../utils/create';
const { componentName, useGlobalConfig, create } = createComponent('Autocomplete');
export default create({
  components: {
    [Tooltip.name]: Tooltip,
    [Input.name]: Input,
    [Scroll.name]: Scroll,
    [Icon.name]: Icon
  },
  directives: {
    clickoutside: ClickOutside
  },
  inheritAttrs: false,
  props: {
    valueKey: {
      type: String,
      default: 'value'
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String as PropType<Placement>,
      validator: (val: string): boolean => {
        return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].includes(val);
      },
      default: 'bottom-start'
    },
    fetchSuggestions: {
      type: Function as PropType<(queryString: string, cb: (data: any[]) => void) => void>,
      default: NOOP
    },
    popperClass: {
      type: String,
      default: ''
    },
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    hideLoading: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    },
    teleported: useTooltipContentProps.teleported,
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear', 'select'],
  setup(props, ctx) {
    const ns = useNamespace('autocomplete');
    const { compatTeleported } = useDeprecateAppendToBody(componentName, 'popperAppendToBody');
    const attrs = useAttrs();
    const suggestions = ref<any[]>([]);
    const highlightedIndex = ref(-1);
    const dropdownWidth = ref('');
    const activated = ref(false);
    const suggestionDisabled = ref(false);
    const loading = ref(false);
    const inputRef = ref<{
      inputOrTextarea: HTMLInputElement | HTMLTextAreaElement;
      focus: () => void;
      $el: HTMLElement;
    } | null>(null);
    const regionRef = ref<HTMLElement | null>(null);
    const popper = ref(null);

    const id = computed(() => {
      return ns.b(String(generateId()));
    });
    const suggestionVisible = computed(() => {
      const isValidData = isArray(suggestions.value) && suggestions.value.length > 0;
      return (isValidData || loading.value) && activated.value;
    });
    const suggestionLoading = computed(() => {
      return !props.hideLoading && loading.value;
    });

    const onSuggestionShow = () => {
      nextTick(() => {
        if (suggestionVisible.value) {
          dropdownWidth.value = `${inputRef.value!.$el.offsetWidth}px`;
        }
      });
    };

    onMounted(() => {
      inputRef.value!.inputOrTextarea.setAttribute('role', 'textbox');
      inputRef.value!.inputOrTextarea.setAttribute('aria-autocomplete', 'list');
      inputRef.value!.inputOrTextarea.setAttribute('aria-controls', 'id');
      inputRef.value!.inputOrTextarea.setAttribute(
        'aria-activedescendant',
        `${id.value}-item-${highlightedIndex.value}`
      );
    });

    const getData = (queryString: string) => {
      if (suggestionDisabled.value) {
        return;
      }
      loading.value = true;
      props.fetchSuggestions(queryString, (suggestionsArg) => {
        loading.value = false;
        if (suggestionDisabled.value) {
          return;
        }
        if (isArray(suggestionsArg)) {
          suggestions.value = suggestionsArg;
          highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
        } else {
          throwError('EAutocomplete', 'autocomplete suggestions must be an array');
        }
      });
    };
    const debouncedGetData = debounce(getData, props.debounce);
    const handleInput = (value: string) => {
      ctx.emit('input', value);
      ctx.emit(UPDATE_MODEL_EVENT, value);
      suggestionDisabled.value = false;
      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.value = true;
        suggestions.value = [];
        return;
      }
      debouncedGetData(value);
    };
    const handleChange = (value) => {
      ctx.emit('change', value);
    };
    const handleFocus = (e) => {
      activated.value = true;
      ctx.emit('focus', e);
      if (props.triggerOnFocus) {
        debouncedGetData(String(props.modelValue));
      }
    };
    const handleBlur = (e) => {
      ctx.emit('blur', e);
    };
    const handleClear = () => {
      activated.value = false;
      ctx.emit(UPDATE_MODEL_EVENT, '');
      ctx.emit('clear');
    };
    const handleKeyEnter = () => {
      if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
        select(suggestions.value[highlightedIndex.value]);
      } else if (props.selectWhenUnmatched) {
        ctx.emit('select', { value: props.modelValue });
        nextTick(() => {
          suggestions.value = [];
          highlightedIndex.value = -1;
        });
      }
    };
    const close = (e: MouseEvent) => {
      const { target } = e;
      if (target) {
        nextTick(() => {
          const close = target.getAttribute('data-close');
          activated.value = close === 'true' ? true : false;
        });
      } else {
        activated.value = false;
      }
    };
    const focus = () => {
      inputRef.value?.focus();
    };
    const select = (item) => {
      ctx.emit('input', item[props.valueKey]);
      ctx.emit(UPDATE_MODEL_EVENT, item[props.valueKey]);
      ctx.emit('select', item);
      nextTick(() => {
        suggestions.value = [];
        highlightedIndex.value = -1;
      });
    };
    const highlight = (index: number) => {
      if (!suggestionVisible.value || loading.value) {
        return;
      }
      if (index < 0) {
        highlightedIndex.value = -1;
        return;
      }
      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1;
      }
      const suggestion = regionRef.value!.querySelector(`.${ns.be('suggestion', 'wrap')}`)!;
      const suggestionList = suggestion.querySelectorAll(`.${ns.be('suggestion', 'list')} li`)!;
      const highlightItem = suggestionList[index];
      const scrollTop = suggestion.scrollTop;
      const { offsetTop, scrollHeight } = highlightItem as HTMLElement;

      if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= scrollHeight;
      }
      highlightedIndex.value = index;
      inputRef.value!.inputOrTextarea.setAttribute(
        'aria-activedescendant',
        `${id.value}-item-${highlightedIndex.value}`
      );
    };

    return {
      attrs,
      suggestions,
      highlightedIndex,
      dropdownWidth,
      activated,
      suggestionDisabled,
      loading,
      inputRef,
      regionRef,
      popper,

      id,
      suggestionVisible,
      suggestionLoading,

      // deprecation in 2.1.0
      compatTeleported,

      getData,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      handleKeyEnter,
      close,
      focus,
      select,
      highlight,
      onSuggestionShow,
      ns
    };
  }
});
</script>
