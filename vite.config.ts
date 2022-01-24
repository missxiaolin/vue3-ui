import { defineConfig } from 'vite';
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';
import path from 'path'


const resolve = path.resolve;
export default defineConfig({
    base: '/',
    server: {
        port: 2021,
        host: '0.0.0.0',
        proxy: {}
    },
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, './src') },
            { find: '@xl-ui', replacement: resolve(__dirname, './src') }
        ]
    },
})