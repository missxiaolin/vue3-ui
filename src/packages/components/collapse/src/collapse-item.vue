<template>
  <div
    :class="[
      ns.b(),
      {
        'is-active': isActive,
        'is-disabled': disabled
      }
    ]"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`l-collapse-content-${id}`"
      :aria-describedby="`l-collapse-content-${id}`"
    >
      <div
        :id="`l-collapse-head-${id}`"
        role="button"
        :tabindex="disabled ? -1 : 0"
        :class="[
          ns.e('header'),
          {
            focusing: focusing,
            'is-active-bg': isActiveBg,
            'is-active': isActive
          }
        ]"
        @click="handleHeaderClick"
        @keyup.space.enter.stop="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <icon class="l-icon-caret-bottom l-collapse-item__arrow" :class="{ 'is-active': isActive }"></icon>
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <collapse-transition>
      <div
        v-show="isActive"
        :class="ns.e('wrap')"
        :id="`l-collapse-content-${id}`"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`l-collapse-head-${id}`"
      >
        <div :class="ns.e('content')">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { inject, computed, ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CollapseItemProps } from './collapse-item';
import CollapseTransition from './collapse-transition.vue';
import { Icon } from '../../icon/index';
import { CollapseProvider } from './collapse.type';
import { generateId } from '../../../utils/util';

const { create } = createComponent('CollapseItem');

export default create({
  components: {
    CollapseTransition,
    Icon
  },
  props: CollapseItemProps,
  setup(props, { emit }) {
    const ns = useNamespace('collapse-item');
    const collapse = inject<CollapseProvider>('collapse');
    const contentWrapStyle = ref({
      height: 'auto',
      display: 'block'
    });

    const contentHeight = ref(0);
    const focusing = ref(false);
    const isClick = ref(false);
    const id = ref(generateId());
    const isActiveBg = ref(false);

    const isActive = computed(() => {
      const activeNames = collapse?.activeNames.value.indexOf(props.name) > -1;
      if (!collapse?.openAway.value) {
        isActiveBg.value = collapse?.background.value && activeNames;
        return activeNames;
      } else {
        isActiveBg.value = collapse?.background.value && collapse?.openAwayNames.value.indexOf(props.name) > -1;
        return activeNames;
      }
    });

    const handleFocus = () => {
      setTimeout(() => {
        if (!isClick.value) {
          focusing.value = true;
        } else {
          isClick.value = false;
        }
      }, 50);
    };

    const handleHeaderClick = () => {
      if (props.disabled) return;
      collapse?.handleItemClick(props.name);
      focusing.value = false;
      isClick.value = true;
    };

    const handleEnterClick = () => {
      collapse?.handleItemClick(props.name);
    };

    return {
      ns,
      isActive,
      contentWrapStyle,
      contentHeight,
      focusing,
      isClick,
      id,
      isActiveBg,
      handleFocus,
      handleHeaderClick,
      handleEnterClick,
      collapse
    };
  }
});
</script>
