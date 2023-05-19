import { inject } from 'vue';
import type { LoadingBarApi } from './loading-bar';
import { loadingBarInjectionKey } from './loading-bar';
import { throwError } from '../../../utils/error';

export const useLoadingBar = (): LoadingBarApi => {
  const loadingBar = inject(loadingBarInjectionKey, null);
  if (loadingBar === null) {
    throwError('use-loading-bar', 'No outer <n-loading-bar-provider /> founded.');
  }
  return loadingBar;
};
