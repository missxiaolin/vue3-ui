import { h, defineComponent, inject } from 'vue';
import { buildProps, definePropType } from '../../../../utils/props';
import { ROOT_PICKER_INJECTION_KEY } from '../date-picker.type';
import type { DateCell } from '../date-picker.type';

import createComponent from '../../../../utils/create';
const { create } = createComponent('DatePickerCell');

export default create({
  // name: 'DatePickerCell',
  props: buildProps({
    cell: {
      type: definePropType<DateCell>(Object)
    }
  }),
  setup(props) {
    const picker = inject(ROOT_PICKER_INJECTION_KEY);
    return () => {
      const cell = props.cell;
      if (picker?.ctx.slots.default) {
        const list = picker.ctx.slots.default(cell).filter((item) => {
          return item.patchFlag !== -2 && item.type.toString() !== 'Symbol(Comment)';
        });
        if (list.length) {
          return list;
        }
      }
      return h(
        'div',
        {
          class: 'l-date-table-cell'
        },
        [
          h(
            'span',
            {
              class: 'l-date-table-cell__text'
            },
            [cell?.text]
          )
        ]
      );
    };
  }
});
