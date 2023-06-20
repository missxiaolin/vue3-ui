// 全局引入变量
import '@/packages/theme-chalk/variables.scss'

import installer from './defaults';

export const version = installer.version;
export { makeInstaller } from './make-installer';

export default installer;