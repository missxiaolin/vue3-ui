import { defineConfig } from 'vite';
import path from 'path';
import config from './package.json';
const resolve = path.resolve;

const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2021 @lui .
*/`;

export default defineConfig({
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: '@xl-ui', replacement: resolve(__dirname, './src') }
      ]
    },
    build: {
      outDir: './libs/theme-chalk',
      minify: true,
      lib: {
        entry: './libs/theme-chalk/themes/default.scss',
        name: 'style',
        fileName: 'style'
      },
      rollupOptions: {
        output: {
          banner
        }
      },
      emptyOutDir: false
    }
  });
  