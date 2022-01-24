import { defineConfig } from 'vite';
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';

export default defineConfig({
    base: '/',
    server: {
        port: 2021,
        host: '0.0.0.0',
        proxy: {}
    },
})