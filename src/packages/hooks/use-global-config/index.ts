import { inject, ref, computed, unref, provide, getCurrentInstance } from 'vue';
import { configProviderContextKey } from '../../tokens';
import type { MaybeRef } from '@vueuse/core';
import type { Ref, App } from 'vue';

import type { ConfigProviderContext } from '../../tokens/config-provider';


// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = undefined) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  } else {
    return config;
  }
}
