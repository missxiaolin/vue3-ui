import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import config from './package.json';
import vueJsx from '@vitejs/plugin-vue-jsx';
console.log('\n====== 综合打包开始 ======\n');
const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2021 @Energy Monster All Right Reserved..
*/`;
const pathResolve = path.resolve;

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: pathResolve(__dirname, './src') },
      { find: '@xl-ui', replacement: pathResolve(__dirname, './src') }
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
  plugins: [vue(), vueJsx()],
  build: {
    outDir: './libs',
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      plugins: [resolve(), commonjs()],
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'vue-router', 'lodash', 'dayjs', '@vueuse/core', '@popperjs/core', 'hls.js'],
      output: {
        banner,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    lib: {
      entry: 'src/packages/main/index.ts',
      name: 'lui',
      fileName: 'lui',
      formats: ['es', 'umd']
    }
  }
});
