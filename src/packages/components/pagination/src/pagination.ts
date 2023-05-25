import { h, ref, provide, computed, defineComponent, getCurrentInstance, watch } from 'vue';
import { useLocaleInject } from '../../../hooks';
import { debugWarn } from '../../../utils/error';
import createComponent from '../../../utils/create';
import { buildProps, definePropType, mutable } from '../../../utils/props';
import { elPaginationKey } from '../../../tokens/pagination';
const { create, componentName } = createComponent('Pagination');
import type { VNode, ExtractPropTypes } from 'vue';

/**
 * It it user's responsibility to guarantee that the value of props.total... is number
 * (same as pageSize, defaultPageSize, currentPage, defaultCurrentPage, pageCount)
 * Otherwise we can reasonable infer that the corresponding field is absent
 */
const isAbsent = (v: unknown): v is undefined => typeof v !== 'number';
type LayoutKey = 'prev' | 'pager' | 'next' | 'jumper' | '->' | 'total' | 'sizes' | 'slot';

export const PaginationProps = buildProps({
  total: Number,
  pageSize: Number,
  defaultPageSize: Number,
  currentPage: Number,
  defaultCurrentPage: Number,
  pageCount: Number,
  pagerCount: {
    type: Number,
    validator: (value: unknown) => {
      return typeof value === 'number' && (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
    },
    default: 7
  },
  layout: {
    type: String,
    default: (['prev', 'pager', 'next', 'jumper', '->', 'total'] as LayoutKey[]).join(', ')
  },
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 20, 30, 40, 50, 100] as const)
  },
  popperClass: {
    type: String,
    default: ''
  },
  prevText: {
    type: String,
    default: ''
  },
  nextText: {
    type: String,
    default: ''
  },
  small: Boolean,
  background: Boolean,
  disabled: Boolean,
  hideOnSinglePage: Boolean
} as const);
export type PaginationProps = ExtractPropTypes<typeof PaginationProps>;

export const paginationEmits = {
  'update:current-page': (val: number) => typeof val === 'number',
  'update:page-size': (val: number) => typeof val === 'number',
  'size-change': (val: number) => typeof val === 'number',
  'current-change': (val: number) => typeof val === 'number',
  'prev-click': (val: number) => typeof val === 'number',
  'next-click': (val: number) => typeof val === 'number'
};
export type PaginationEmits = typeof paginationEmits;

export default create({});
