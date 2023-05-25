<template>
    <span class="l-pagination__total"> 共 {{ total }} 条 </span>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useLocaleInject } from '../../../../hooks';
  
  import type { ExtractPropTypes } from 'vue';
  
  const paginationTotalProps = {
    total: {
      type: Number,
      default: 1000
    }
  } as const;
  export type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>;
  import createComponent from '../../../../utils/create';
  const { create } = createComponent('PaginationTotal');
  
  export default create({
    props: paginationTotalProps,
  
    setup() {
      // const { t } = useLocaleInject()
      return {
        // t,
      };
    }
  });
  </script>
  