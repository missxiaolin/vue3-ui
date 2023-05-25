<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <icon icon="l-youbian" v-else></icon>
  </button>
</template>

<script lang="ts">
import { computed } from 'vue';
import { Icon } from '../../../icon/index';

const paginationNextProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 50
  },
  nextText: {
    type: String,
    default: ''
  }
} as const;
import createComponent from '../../../../utils/create';
const { create } = createComponent('PaginationNext');

export default create({
  components: {
    Icon
  },
  props: paginationNextProps,
  emits: ['click'],

  setup(props) {
    const internalDisabled = computed(
      () => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0
    );

    return {
      internalDisabled
    };
  }
});
</script>
