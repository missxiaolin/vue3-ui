import { inject } from 'vue';
import { elPaginationKey } from '../../../tokens/pagination';

export const usePagination = () => inject(elPaginationKey, {});
