import { buildProps, definePropType } from '../../../utils/props';
import type { Language } from '../../../locale';
import type { ButtonConfigContext } from '../../button/src/button';
import type { MessageConfigContext } from '../../message/src/message';
import createComponent from '../../../utils/create';
import { watch, renderSlot } from 'vue';

export const messageConfig: MessageConfigContext = {};

export const ConfigProviderProps = buildProps({
  locale: {
    type: definePropType<Language>(Object)
  },

  size: {
    type: String,
    values: ['', 'default', 'large', 'medium', 'small', 'mini']
  },

  button: {
    type: definePropType<ButtonConfigContext>(Object)
  },

  message: {
    type: definePropType<MessageConfigContext>(Object)
  },

  zIndex: {
    type: Number
  },

  namespace: {
    type: String,
    default: 'e'
  }
} as const);


const { create } = createComponent('ConfigProvider');

export default create({
  props: ConfigProviderProps,
  setup(props, { slots }) {
    watch(
      () => props.message,
      (val) => {
        Object.assign(messageConfig, val ?? {});
      },
      { immediate: true, deep: true }
    );
  }
})
