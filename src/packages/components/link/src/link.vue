<template>
  <a
    :class="[
      'l-link',
      linkType ? 'l-link--' + linkType : '',
      {
        'is-disabled': disabled
      },
      ns.is('underline', showUnderline)
    ]"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <span v-if="$slots.default">
      <slot />
    </span>
    <l-icon v-if="linkIcon" :icon="linkIcon" :class="iconClass"></l-icon>
    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { linkProps } from './link';
import { useNamespace } from '../../../hooks';
const { componentName, create } = createComponent('Link');
import { Icon } from '../../icon';

export default create({
  components: {
    [Icon.name]: Icon
  },
  props: linkProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('link');
    const { disabled, icon, href } = toRefs(props);

    const linkType = computed(() => props.type || 'default');

    const linkIcon = computed(() => {
      return icon.value;
    });

    const iconClass = computed(() => {
      const type = props.type;
      return type ? `l-link--${type}` : '';
    });

    const showUnderline = computed(() => {
      return slots && slots.default && !icon.value;
    });

    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) emit('click', event);
    };

    return {
      componentName,
      ns,
      href,
      disabled,
      linkType,
      linkIcon,
      iconClass,
      showUnderline,
      handleClick
    };
  }
});
</script>
