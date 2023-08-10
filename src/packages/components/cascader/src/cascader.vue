<template>
  <l-tooltip
    ref="tooltipRef"
    v-model:visible="popperVisible"
    :teleported="compatTeleported"
    :popper-class="`l-cascader__dropdown ${popperClass}`"
    :popper-options="popperOptions"
    :fallback-placements="['bottom-start', 'bottom', 'top-start', 'top', 'right', 'left']"
    :stop-popper-mouse-event="false"
    :gpu-acceleration="false"
    placement="bottom-start"
    transition="l-zoom-in-top"
    effect="light"
    pure
    persistent
    @hide="hideSuggestionPanel"
  >
    <template #default>
      <div
        v-clickoutside:[popperPaneRef]="() => togglePopperVisible(false)"
        :class="[
          'l-cascader',
          realSize && `l-cascader--${realSize}`,
          { 'is-disabled': isDisabled },
          $attrs.class,
          labelInsideClass
        ]"
        :style="$attrs.style"
        @click="() => togglePopperVisible(readonly ? undefined : true)"
        @keydown="handleKeyDown"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <label v-if="label" :class="[labelClass]">{{ label }}</label>
        <l-input
          ref="input"
          v-model="inputValue"
          :placeholder="inputPlaceholder"
          :readonly="readonly"
          :disabled="isDisabled"
          :validate-event="false"
          :size="realSize"
          :class="{ 'is-focus': popperVisible }"
          @compositionstart="handleComposition"
          @compositionupdate="handleComposition"
          @compositionend="handleComposition"
          @focus="(e) => $emit('focus', e)"
          @blur="(e) => $emit('blur', e)"
          @input="handleInput"
        >
          <template #suffix>
            <l-icon
              v-if="clearBtnVisible"
              key="clear"
              class="l-input__icon icon-circle-close"
              @click.stop="handleClear"
              icon="l-guanbi"
            >
              <!-- <circle-close /> -->
            </l-icon>
            <l-icon
              v-else
              key="arrow-down"
              :class="['l-input__icon', 'icon-arrow-down', popperVisible && 'is-reverse']"
              @click.stop="togglePopperVisible()"
              icon="l-xia"
            >
              <!-- <arrow-down /> -->
            </l-icon>
          </template>
        </l-input>

        <div v-if="multiple" ref="tagWrapper" class="l-cascader__tags">
          <l-tag
            v-for="tag in presentCascaderTags"
            :key="tag.key"
            type="info"
            :size="tagSize"
            :hit="tag.hitState"
            :closable="tag.closable"
            disable-transitions
            @close="deleteCascaderTag(tag)"
          >
            <template v-if="tag.isCollapseTag === false">
              <span>{{ tag.text }}</span>
            </template>
            <template v-else>
              <l-tooltip :disabled="popperVisible || !collapseTagsTooltip" placement="bottom" effect="light">
                <span>{{ tag.text }}</span>
                <template #content>
                  <div :class="nsCascader.e('collapse-tags')">
                    <l-scroll>
                      <div :class="nsCascader.e('collapse-tag')" v-for="(tag2, idx) in allPresentTags" :key="idx">
                        <l-tag
                          class="in-tooltip"
                          type="info"
                          :size="tagSize"
                          :hit="tag2.hitState"
                          :closable="tag2.closable"
                          disable-transitions
                          @close="deleteCascaderTag(tag2)"
                        >
                          <span>{{ tag2.text }}</span>
                        </l-tag>
                      </div>
                    </l-scroll>
                  </div>
                </template>
              </l-tooltip>
            </template>
          </l-tag>
          <input
            v-if="filterable && !isDisabled"
            v-model="searchInputValue"
            type="text"
            class="l-cascader__search-input"
            :placeholder="presentText ? '' : inputPlaceholder"
            @input="(e) => handleInput(searchInputValue, e)"
            @click.stop="togglePopperVisible(true)"
            @keydown.delete="handleDelete"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
          />
        </div>
      </div>
    </template>

    <template #content>
      <l-cascader-panel
        v-show="!filtering"
        ref="panel"
        v-model="checkedValue"
        :options="options"
        :props="props"
        :border="false"
        :render-label="$slots.default"
        @expand-change="handleExpandChange"
        @close="$nextTick(() => togglePopperVisible(false))"
      />
      <l-scroll
        v-if="filterable"
        v-show="filtering"
        ref="suggestionPanel"
        tag="ul"
        class="l-cascader__suggestion-panel"
        view-class="l-cascader__suggestion-list"
        @keydown="handleSuggestionKeyDown"
      >
        <template v-if="suggestions.length">
          <li
            v-for="item in suggestions"
            :key="item.uid"
            :class="['l-cascader__suggestion-item', item.checked && 'is-checked']"
            :tabindex="-1"
            @click="handleSuggestionClick(item)"
          >
            <span>{{ item.text }}</span>
            <l-icon v-if="item.checked" icon="l-icon-check">
            </l-icon>
          </li>
        </template>
        <slot v-else name="empty">
          <li class="l-cascader__empty-text">{{ t('el.cascader.noMatch') }}</li>
        </slot>
      </l-scroll>
    </template>
  </l-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { isPromise } from '@vue/shared';
import { debounce } from 'lodash';
import { useNamespace } from '../../../hooks';
import { isClient } from '@vueuse/core';
import { CascaderPanel } from '../../../components/cascader-panel';
import { CommonProps } from '../../../components/cascader-panel';
import { Input } from '../../../components/input';
import { Tooltip } from '../../../components/tooltip';
import { useTooltipContentProps } from '../../../components/tooltip';
import { useDeprecateAppendToBody } from '../../../components/popper';
import { Scroll } from '../../../components/scroll';
import { Tag } from '../../../components/tag';
import { Icon } from '../../../components/icon';

import { elFormKey, elFormItemKey } from '../../../tokens';
import { ClickOutside as Clickoutside } from '../../../directives';
import { useLocaleInject, useSize } from '../../../hooks';

import { focusNode, getSibling } from '../../../utils/aria';
import { addResizeListener, removeResizeListener } from '../../../utils/resize-event';
import { isValidComponentSize } from '../../../utils/validators';
import { isKorean } from '../../../utils/isDef';
import { EVENT_CODE } from '../../../utils/aria';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event';

import type { Options } from '../../../components/popper';
import type { ComputedRef, PropType, Ref } from 'vue';
import type { ElFormContext, ElFormItemContext } from '../../../tokens';
import type { CascaderValue, CascaderNode, CascaderTag } from '../../../components/cascader-panel';
import type { ComponentSize } from '../../../utils/types';
import { getComponentSize } from '../../../utils/size';

type cascaderPanelType = InstanceType<typeof CascaderPanel>;
type tooltipType = InstanceType<typeof Tooltip>;
type inputType = InstanceType<typeof Input>;
type suggestionPanelType = InstanceType<typeof Scroll>;

const DEFAULT_INPUT_HEIGHT = 40;

const popperOptions: Partial<Options> = {
  modifiers: [
    {
      name: 'arrowPosition',
      enabled: true,
      phase: 'main',
      fn: ({ state }) => {
        const { modifiersData, placement } = state as any;
        if (['right', 'left', 'bottom', 'top'].includes(placement)) return;
        modifiersData.arrow.x = 35;
      },
      requires: ['arrow']
    }
  ]
};
import createComponent from '../../../utils/create';
const { create, componentName } = createComponent('Cascader');
export default create({
  components: {
    CascaderPanel,
    Input,
    Tooltip,
    Scroll,
    Tag,
    Icon
    // CircleClose,
    // Check,
    // ArrowDown,
  },

  directives: {
    Clickoutside
  },

  props: {
    ...CommonProps,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    placeholder: {
      type: String
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function as PropType<(node: CascaderNode, keyword: string) => boolean>,
      default: (node: CascaderNode, keyword: string) => node.text.includes(keyword)
    },
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function as PropType<(value: string) => boolean | Promise<any>>,
      default: () => true
    },
    popperClass: {
      type: String,
      default: ''
    },
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    },
    teleported: useTooltipContentProps.teleported,
    label: {
      type: String
    }
  },

  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    'focus',
    'blur',
    'visible-change',
    'expand-change',
    'remove-tag',
    'leaf-change'
  ],

  setup(props, { emit }) {
    let inputInitialHeight = 0;
    let pressDeleteCount = 0;

    const nsCascader = useNamespace('cascader');
    const { compatTeleported } = useDeprecateAppendToBody(componentName, 'popperAppendToBody');
    const { t } = useLocaleInject();
    const elForm = inject(elFormKey, {} as ElFormContext);
    const elFormItem = inject(elFormItemKey, {} as ElFormItemContext);
    const tooltipRef: Ref<tooltipType | null> = ref(null);
    const input: Ref<inputType | null> = ref(null);
    const tagWrapper = ref(null);
    const panel: Ref<cascaderPanelType | null> = ref(null);
    const suggestionPanel: Ref<suggestionPanelType | null> = ref(null);
    const popperVisible = ref(false);
    const inputHover = ref(false);
    const filtering = ref(false);
    const inputValue = ref('');
    const searchInputValue = ref('');
    const presentCascaderTags: Ref<CascaderTag[]> = ref([]);
    const allPresentTags: Ref<CascaderTag[]> = ref([]);

    const suggestions: Ref<CascaderNode[]> = ref([]);
    const isOnComposition = ref(false);

    const labelClass = ref('');

    const labelInsideClass = computed(() => {
      labelClass.value = 'label-adsorbent-top';
      return props.label && `l-input-inside-label`;
    });

    const isDisabled = computed(() => props.disabled || elForm.disabled);
    const inputPlaceholder = computed(() => props.placeholder || t('el.cascader.placeholder'));
    const realSize = useSize();
    const tagSize = computed(() => (['small'].includes(realSize.value) ? 'small' : 'default'));
    const multiple = computed(() => !!props.props.multiple);
    const readonly = computed(() => !props.filterable || multiple.value);
    const searchKeyword = computed(() => (multiple.value ? searchInputValue.value : inputValue.value));
    const checkedNodes: ComputedRef<CascaderNode[]> = computed(() => panel.value?.checkedNodes || []);
    const clearBtnVisible = computed(() => {
      if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value) return false;

      return !!checkedNodes.value.length;
    });
    const presentText = computed(() => {
      const { showAllLevels, separator } = props;
      const nodes = checkedNodes.value;
      return nodes.length ? (multiple.value ? ' ' : nodes[0].calcText(showAllLevels, separator)) : '';
    });

    const checkedValue = computed<CascaderValue>({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit(UPDATE_MODEL_EVENT, val);
        emit(CHANGE_EVENT, val);
        emit('leaf-change', { value: val, leaf: getCheckedNodes(false) });
        elFormItem.validate?.('change');
      }
    });

    const popperPaneRef = computed(() => {
      return tooltipRef.value?.popperRef?.contentRef;
    });

    const togglePopperVisible = (visible?: boolean) => {
      if (isDisabled.value) return;

      visible = visible ?? !popperVisible.value;

      if (visible !== popperVisible.value) {
        popperVisible.value = visible;
        input.value?.input?.setAttribute('aria-expanded', `${visible}`);

        if (visible) {
          updatePopperPosition();
          nextTick(panel.value?.scrollToExpandingNode);
        } else if (props.filterable) {
          const { value } = presentText;
          inputValue.value = value;
          searchInputValue.value = value;
        }

        emit('visible-change', visible);
      }
    };

    const updatePopperPosition = () => {
      nextTick(() => {
        tooltipRef.value?.updatePopper();
      });
    };

    const hideSuggestionPanel = () => {
      filtering.value = false;
    };

    const genCascaderTag = (node: CascaderNode): CascaderTag => {
      const { showAllLevels, separator } = props;
      return {
        node,
        key: node.uid,
        text: node.calcText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled.value && !node.isDisabled,
        isCollapseTag: false
      };
    };

    const deleteCascaderTag = (tag: CascaderTag) => {
      const node = tag.node as CascaderNode;
      node.doCheck(false);
      panel.value?.calculateCheckedValue();
      emit('remove-tag', node.valueByOption);
    };

    const calculatePresentCascaderTags = () => {
      if (!multiple.value) return;

      const nodes = checkedNodes.value;
      const tags: CascaderTag[] = [];
      allPresentTags.value = [];

      if (nodes.length) {
        const [first, ...rest] = nodes;
        const restCount = rest.length;

        tags.push(genCascaderTag(first));

        if (restCount) {
          if (props.collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false,
              isCollapseTag: props.collapseTagsTooltip
            });
          } else {
            rest.forEach((node) => tags.push(genCascaderTag(node)));
          }
        }
        if (props.collapseTagsTooltip) {
          rest.forEach((node) => allPresentTags.value.push(genCascaderTag(node)));
        }
      }
      presentCascaderTags.value = tags;
    };

    const calculateSuggestions = () => {
      const { filterMethod, showAllLevels, separator } = props;
      const res = panel.value?.getFlattedNodes(!props.props.checkStrictly)?.filter((node) => {
        if (node.isDisabled) return false;
        node.calcText(showAllLevels, separator);
        return filterMethod(node, searchKeyword.value);
      });

      if (multiple.value) {
        presentCascaderTags.value.forEach((tag) => {
          tag.hitState = false;
        });
      }

      filtering.value = true;
      suggestions.value = res!;
      updatePopperPosition();
    };

    const focusFirstNode = () => {
      let firstNode!: HTMLElement;

      if (filtering.value && suggestionPanel.value) {
        firstNode = suggestionPanel.value.$el.querySelector('.l-cascader__suggestion-item');
      } else {
        firstNode = panel.value?.$el.querySelector('.l-cascader-node[tabindex="-1"]');
      }

      if (firstNode) {
        firstNode.focus();
        !filtering.value && firstNode.click();
      }
    };

    const updateStyle = () => {
      const inputInner = input.value?.input;
      const tagWrapperEl = tagWrapper.value;
      const suggestionPanelEl = suggestionPanel.value?.$el;

      if (!isClient || !inputInner) return;

      if (suggestionPanelEl) {
        const suggestionList = suggestionPanelEl.querySelector('.l-cascader__suggestion-list');
        suggestionList.style.minWidth = `${inputInner.offsetWidth}px`;
      }

      if (tagWrapperEl) {
        const { offsetHeight } = tagWrapperEl;
        const height =
          presentCascaderTags.value.length > 0
            ? `${Math.max(offsetHeight + 6, inputInitialHeight)}px`
            : `${inputInitialHeight}px`;
        inputInner.style.height = height;
        updatePopperPosition();
      }
    };

    const getCheckedNodes = (leafOnly: boolean) => {
      return panel.value?.getCheckedNodes(leafOnly);
    };

    const handleExpandChange = (value: CascaderValue) => {
      updatePopperPosition();
      emit('expand-change', value);
    };

    const handleComposition = (event: CompositionEvent) => {
      const text = (event.target as HTMLInputElement)?.value;
      if (event.type === 'compositionend') {
        isOnComposition.value = false;
        nextTick(() => handleInput(text));
      } else {
        const lastCharacter = text[text.length - 1] || '';
        isOnComposition.value = !isKorean(lastCharacter);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnComposition.value) return;

      switch (e.code) {
        case EVENT_CODE.enter:
          togglePopperVisible();
          break;
        case EVENT_CODE.down:
          togglePopperVisible(true);
          nextTick(focusFirstNode);
          e.preventDefault();
          break;
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          togglePopperVisible(false);
          break;
      }
    };

    const handleClear = () => {
      panel.value?.clearCheckedNodes();
      togglePopperVisible(false);
    };

    const handleSuggestionClick = (node: CascaderNode) => {
      const { checked } = node;

      if (multiple.value) {
        panel.value?.handleCheckChange(node, !checked, false);
      } else {
        !checked && panel.value?.handleCheckChange(node, true, false);
        togglePopperVisible(false);
      }
    };

    const handleSuggestionKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const { code } = e;

      switch (code) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          const distance = code === EVENT_CODE.up ? -1 : 1;
          focusNode(getSibling(target, distance, '.l-cascader__suggestion-item[tabindex="-1"]'));
          break;
        }
        case EVENT_CODE.enter:
          target.click();
          break;
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          togglePopperVisible(false);
          break;
      }
    };

    const handleDelete = () => {
      const tags = presentCascaderTags.value;
      const lastCascaderTag = tags[tags.length - 1];
      pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1;

      if (!lastCascaderTag || !pressDeleteCount) return;

      if (lastCascaderTag.hitState) {
        deleteCascaderTag(lastCascaderTag);
      } else {
        lastCascaderTag.hitState = true;
      }
    };

    const handleFilter = debounce(() => {
      const { value } = searchKeyword;

      if (!value) return;

      const passed = props.beforeFilter(value);

      if (isPromise(passed)) {
        passed.then(calculateSuggestions).catch(() => {
          /* prevent log error */
        });
      } else if (passed !== false) {
        calculateSuggestions();
      } else {
        hideSuggestionPanel();
      }
    }, props.debounce);

    const handleInput = (val: string, e?: KeyboardEvent) => {
      !popperVisible.value && togglePopperVisible(true);

      if (e?.isComposing) return;

      val ? handleFilter() : hideSuggestionPanel();
    };

    watch(filtering, updatePopperPosition);

    watch([checkedNodes, isDisabled], calculatePresentCascaderTags);

    watch(presentCascaderTags, () => {
      nextTick(() => updateStyle());
    });

    watch(presentText, (val) => (inputValue.value = val), { immediate: true });

    onMounted(() => {
      const inputEl = input.value?.$el;
      inputInitialHeight = inputEl?.offsetHeight || getComponentSize(realSize.value) || DEFAULT_INPUT_HEIGHT;
      addResizeListener(inputEl, updateStyle);
    });

    onBeforeUnmount(() => {
      removeResizeListener(input.value?.$el, updateStyle);
    });

    return {
      popperOptions,
      tooltipRef,
      popperPaneRef,
      input,
      tagWrapper,
      panel,
      suggestionPanel,
      popperVisible,
      inputHover,
      inputPlaceholder,
      filtering,
      presentText,
      checkedValue,
      inputValue,
      searchInputValue,
      presentCascaderTags,
      suggestions,
      isDisabled,
      isOnComposition,
      realSize,
      tagSize,
      multiple,
      readonly,
      clearBtnVisible,
      // deprecation in ver 2.1.0
      compatTeleported,
      allPresentTags,

      t,
      togglePopperVisible,
      hideSuggestionPanel,
      deleteCascaderTag,
      focusFirstNode,
      getCheckedNodes,
      handleExpandChange,
      handleKeyDown,
      handleComposition,
      handleClear,
      handleSuggestionClick,
      handleSuggestionKeyDown,
      handleDelete,
      handleInput,
      labelClass,
      labelInsideClass,
      nsCascader
    };
  }
});
</script>
