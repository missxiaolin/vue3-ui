import { PropType } from 'vue';
import { buildProps } from '../../../utils/props';
import { generateId } from '../../../utils/util';

export const CollapseItemProps = buildProps({
  title: {
    type: String,
    default: ''
  },
  name: {
    type: [String, Number] as PropType<string | number>,
    default: () => {
      return generateId();
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const);