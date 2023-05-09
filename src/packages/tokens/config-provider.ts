import type { configProviderProps } from '../components/config-provider/src/config-provider';
import type { InjectionKey, ExtractPropTypes } from 'vue';

export type ConfigProviderContext = ExtractPropTypes<typeof configProviderProps>;

export const configProviderContextKey: InjectionKey<ConfigProviderContext> = Symbol();
