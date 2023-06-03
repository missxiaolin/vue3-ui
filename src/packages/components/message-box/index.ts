import type { App } from 'vue';
import type { SFCWithInstall } from '../../utils/types';
import LMessageBox from './src/message-box';

const _MessageBox = LMessageBox as SFCWithInstall<typeof LMessageBox>;

_MessageBox.install = (app: App) => {
  app.config.globalProperties.$msgbox = _MessageBox;
  app.config.globalProperties.$_MessageBox = _MessageBox;
  app.config.globalProperties.$alert = _MessageBox.alert;
  app.config.globalProperties.$confirm = _MessageBox.confirm;
  app.config.globalProperties.$prompt = _MessageBox.prompt;
};

export const MessageBox = _MessageBox;
export default MessageBox;

export * from './src/message-box.type';
