import TimePicker from './src/time-picker';
export { default as TimePicker } from './src/time-picker';

/** export end */

import CommonPicker from './src/common/picker.vue';
import TimePickPanel from './src/time-picker-com/panel-time-pick.vue';

export * from './src/common/date-utils';
export * from './src/common/constant';
export * from './src/common/props';

export { CommonPicker, TimePickPanel };
export const ETimePicker = TimePicker;
