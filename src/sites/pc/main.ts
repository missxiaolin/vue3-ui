import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import '../assets/style/index.scss'

import UI from '../../packages/main/index';
import '../../packages/main/style'

const app = createApp(App);
app.use(UI, {
    size: 'small',
    zIndex: 2000
    // locale: en,
  });
app.use(router);
app.mount('#app');