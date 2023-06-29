import { defineConfig } from 'vite';
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
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
    css: {
        preprocessorOptions: {
            scss: {
                // example : additionalData: `@import "./src/design/styles/variables";`
                // dont need include file extend .scss
                // additionalData: `@import "@/packages/styles/variables.scss";@import "@/sites/assets/styles/variables.scss";`
              }
        },
        postcss: {
            plugins: [
                require('autoprefixer')({
                    overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'ie > 11', 'iOS >= 10', 'Android >= 5']
                })
            ]
        }
    },
    plugins: [
        vitePluginVuedoc({}),
        vue({
            include: [/\.vue$/, /\.md$/, ...vueDocFiles]
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ]
})