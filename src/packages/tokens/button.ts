import type { InjectionKey } from 'vue';

import type { ButtonProps } from '../components/button/src/button';

export interface EButtonGroupContext {
  size?: ButtonProps['size'];
  type?: ButtonProps['type'];
}

export const ButtonGroupKey: InjectionKey<EButtonGroupContext> = Symbol();
