import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import config from './package.json';
import input from './src/packages/components.json';
import vueJsx from '@vitejs/plugin-vue-jsx';
console.log('\n====== 分批打包开始 ======\n');

const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2021 @lui.
*/`;

const pathResolve = path.resolve;


export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: pathResolve(__dirname, './src') },
      { find: '@xl-ui', replacement: pathResolve(__dirname, './src') }
    ]
  },
  plugins: [vue(), vueJsx()],
  build: {
    minify: true,
    outDir: './libs',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    lib: {
      entry: '',
      name: 'index',
      // fileName: (format) => format,
      formats: ['es']
    },
    rollupOptions: {
      plugins: [resolve(), commonjs()],
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'vue-router'],
      input,
      output: {
        banner,
        dir: path.resolve(__dirname, './libs/packages/_es'),
        entryFileNames: '[name].js',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    emptyOutDir: false
  }
});
