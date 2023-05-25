<template>
  <div
    :class="[
      ns.b(),
      shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow',
      {
        'is-border': border
      }
    ]"
  >
    <slot name="header">
      <dl
        v-if="$slots.title || title || $slots.panel"
        :class="['l-panel__header', { 'l-panel__header__bg': headGray, 'l-panel__header__noline': !shrinkSwitch }]"
      >
        <dt>
          <slot name="title">{{ title }}</slot>
        </dt>
        <dd>
          <slot name="panel"></slot>
          <l-button type="text" @click="handleShrinkSwicth" v-if="showClose">
            {{ switchText }}
            <icon :icon="switchIcon" />
          </l-button>
        </dd>
      </dl>
    </slot>
    <div :class="ns.e('body')" :style="bodyStyle" v-show="shrinkSwitch">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch, toRaw } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { PanelProps } from './panel';
import { Icon } from '../../icon/index';

const { componentName, create } = createComponent('Panel');

export default create({
  components: {
    Icon
  },
  props: PanelProps,
  setup(props, { attrs }) {
    const ns = useNamespace('panel');
    let shrinkSwitch = ref(true);
    watch(
      () => props.close,
      (val, oldVal) => {
        shrinkSwitch.value = !val;
      },
      { immediate: true }
    );
    const handleShrinkSwicth = () => {
      shrinkSwitch.value = !shrinkSwitch.value;
    };
    const switchText = computed(() => {
      return shrinkSwitch.value ? '收起' : '展开';
    });
    const switchIcon = computed(() => {
      return shrinkSwitch.value ? 'l-shang' : 'l-xia';
    });
    return {
      componentName,
      ns,
      shrinkSwitch,
      switchText,
      switchIcon,
      handleShrinkSwicth,
      ...props
    };
  }
});
</script>
