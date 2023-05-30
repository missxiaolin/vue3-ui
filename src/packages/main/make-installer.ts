import { provideGlobalConfig } from '../hooks';
const version = 1.0;
const INSTALLED_KEY = Symbol('INSTALLED_KEY');
import type { App, Plugin } from 'vue';
import type { ConfigProviderContext } from '../tokens';

/**
 * 注册组件
 * @param components 
 * @returns 
 */
export const makeInstaller = (components: any) => {
  const install = (app: any, options: any = {}) => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach((c: any) => app.use(c));
    provideGlobalConfig(options, app, true);
    app.config.globalProperties.$UI = options;
  };
  return {
    install,
    version,
    ...components
  };
};
