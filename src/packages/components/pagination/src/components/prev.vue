<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <icon icon="l-zuobian" v-else></icon>
  </button>
</template>

<script lang="ts">
import { computed } from 'vue';
import { Icon } from '../../../icon/index';

const paginationPrevProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: {
    type: String,
    default: ''
  }
} as const;

import createComponent from '../../../../utils/create';
const { create } = createComponent('PaginationPrev');

export default create({
  components: {
    Icon
  },
  props: paginationPrevProps,
  emits: ['click'],

  setup(props) {
    const internalDisabled = computed(() => props.disabled || props.currentPage <= 1);
    return {
      internalDisabled
    };
  }
});
</script>
