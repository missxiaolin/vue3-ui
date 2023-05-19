import { buildProps } from '../../../utils/props';
import type { ExtractPropTypes, PropType } from 'vue';
import { InjectionKey } from 'vue';

export const loadingBarProps = buildProps({
  to: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: undefined
  },
  loadingBarStyle: {
    type: Object as PropType<{
      loading?: Object;
      error?: Object;
    }>
  }
} as const);
export type LoadingBarProps = ExtractPropTypes<typeof loadingBarProps>;

export const loadingBarEmits = {
  finish: () => true,
  start: () => true,
  error: () => true
};
export type LoadingBarEmits = typeof loadingBarEmits;

export interface LoadingBarApiInt {
  start: () => void;
  error: () => void;
  finish: () => void;
}
export type LoadingBarApi = LoadingBarApiInt;

export const loadingBarInjectionKey: InjectionKey<LoadingBarApi> = Symbol('l-loading-bar-api') as any;
