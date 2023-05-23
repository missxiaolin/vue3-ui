import { PropType } from 'vue';
import { buildProps } from '../../../utils/props';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';

export const CollapseProps = buildProps({
  accordion: { // 是否手风琴模式
    type: Boolean,
    default: false
  },
  background: { // 背景
    type: Boolean,
    default: false
  },
  openAway: { // 是否一直打开（此属性只适用在手风琴模式）
    type: Boolean,
    default: false
  },
  modelValue: { // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)
    type: [Array, String, Number] as PropType<string | number | Array<string | number>>,
    default: () => []
  }
} as const);

export const CollapseEmits = {
  [CHANGE_EVENT]: (evt: MouseEvent) => evt instanceof MouseEvent,
  [UPDATE_MODEL_EVENT]: (evt: MouseEvent) => evt instanceof MouseEvent
};
export type CollapseEmits = typeof CollapseEmits;
