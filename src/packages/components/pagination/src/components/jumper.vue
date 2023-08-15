<template>
    <span class="l-pagination__jump">
      <!-- {{ t('el.pagination.goto') }} -->
      <l-input
        size="mini"
        class="l-pagination__editor is-in-pagination"
        :min="1"
        :max="pageCount"
        :disabled="disabled"
        :model-value="innerValue"
        type="number"
        @update:model-value="handleInput"
        @change="handleChange"
      />
      <!-- {{ t('el.pagination.pageClassifier') }} -->
    </span>
  </template>
  
  <script lang="ts">
  import { computed, ref } from 'vue';
  import { useLocaleInject } from '../../../../hooks';
  import { Input } from '../../../../components/input';
  import { usePagination } from '../usePagination';
  
  import createComponent from '../../../../utils/create';
  const { create } = createComponent('PaginationJumper');
  
  export default create({
    components: {
      Input
    },
  
    setup() {
      const { t } = useLocaleInject();
      const { pageCount, disabled, currentPage, changeEvent } = usePagination();
      const userInput = ref<number>();
      const innerValue = computed(() => userInput.value ?? currentPage?.value);
  
      function handleInput(val: number | string) {
        userInput.value = +val;
      }
  
      function handleChange(val: number | string) {
        changeEvent?.(+val);
        userInput.value = undefined;
      }
  
      return {
        pageCount,
        disabled,
        innerValue,
  
        t,
        handleInput,
        handleChange
      };
    }
  });
  </script>
  