import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import '../assets/style/index.scss'

import UI from '../../packages/main/index';
import '../../packages/styles/index.scss'

const app = createApp(App);
app.use(UI);
app.use(router);
app.mount('#app');