import { buildProps, definePropType } from '../../../utils/props';
import type { Language } from '../../../locale';
import type { ButtonConfigContext } from '../../button/src/button';

export const configProviderProps = buildProps({
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

  zIndex: {
    type: Number
  },

  namespace: {
    type: String,
    default: 'e'
  }
} as const);
