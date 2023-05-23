import { PropType } from 'vue';
import { buildProps } from '../../../utils/props';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';

export const CollapseProps = buildProps({
  accordion: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: false
  },
  openAway: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Array, String, Number] as PropType<string | number | Array<string | number>>,
    default: () => []
  }
} as const);

export const CollapseEmits = {
  [CHANGE_EVENT]: (evt: MouseEvent) => evt instanceof MouseEvent,
  [UPDATE_MODEL_EVENT]: (evt: MouseEvent) => evt instanceof MouseEvent
};
export type CollapseEmits = typeof CollapseEmits;
