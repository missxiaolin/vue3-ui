import { componentSizes, datePickTypes } from '../constants/event';
import type { ComponentSize, DatePickType } from '../constants/event';

export const isValidComponentSize = (val: string): val is ComponentSize | '' => ['', ...componentSizes].includes(val);
