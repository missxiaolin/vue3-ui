export const CHANGE_EVENT = 'change'

export const CLICK_EVENT = 'click'

export const UPDATE_MODEL_EVENT = 'update:modelValue';

export const UPDATE_OVERLAY_EVENT = 'update:visible'

export const INPUT_EVENT = 'input';
export const datePickTypes = [
  'year',
  'month',
  'date',
  'dates',
  'week',
  'datetime',
  'datetimerange',
  'daterange',
  'monthrange'
] as const;
export type DatePickType = typeof datePickTypes[number];

export const componentSizes = ['', 'default', 'large', 'medium', 'small', 'mini'] as const;
export type ComponentSize = typeof componentSizes[number];