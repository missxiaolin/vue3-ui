import { CHANGE_EVENT } from '../../../constants/event';
import { buildProps, definePropType } from '../../../utils/props';
import { isNumber } from '../../../utils/util';
import type Steps from './steps.vue';

export const StepsProps = buildProps({
  /**
   * @description the spacing of each step, will be responsive if omitted. Supports percentage.
   */
  space: {
    type: [Number, String],
    default: ''
  },
  /**
   * @description current activation step
   */
  active: {
    type: Number,
    default: 0
  },
  /**
   * @description display direction
   */
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical']
  },
  /**
   * @description center title and description
   */
  alignCenter: {
    type: Boolean
  },
  /**
   * @description whether to apply simple theme
   */
  simple: {
    type: Boolean
  },
  /**
   * @description status of end step
   */
  finishStatus: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
    default: 'finish'
  },
  /**
   * @description status of current step
   */
  processStatus: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
    default: 'process'
  }
} as const);

export const StepsEmits = {
  [CHANGE_EVENT]: (newVal: number, oldVal: number) => [newVal, oldVal].every(isNumber)
};
export type StepsEmits = typeof StepsEmits;

export type StepsInstance = InstanceType<typeof Steps>;
