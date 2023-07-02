import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import rollupResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { readdirSync } from 'fs';
import { resolve, basename } from 'path';
import config from './package.json';
const filePath = './src/packages/locale/lang';
let entrieLists = {};
// 获取组件目录
const FilesList = readdirSync(resolve(__dirname, filePath));

console.log('FilesList----', FilesList);
// 遍历组件
FilesList.forEach(
  (file, index) => (entrieLists[`${file.split('.ts')[0]}`] = resolve(__dirname, `${filePath}/${file}`))
);
// FilesList.forEach((file, index) => entrieLists.push(`${filePath}/${file}`));

console.log('entrieLists----', entrieLists);

const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2021 @lui.
*/`;

export default defineConfig({
  build: {
    minify: true,
    outDir: './libs/locale',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    lib: {
      entry: '', //resolve(__dirname, './src/packages/locale/lang/en.ts'),
      name: 'libs',
      formats: ['es']
    },
    rollupOptions: {
      plugins: [rollupResolve(), commonjs()],
      input: entrieLists,
      output: {
        banner,
        // inlineDynamicImports: true,
        // dir: resolve(__dirname, './libs/locale'),
        entryFileNames: '[name].js'
        //   // format: "umd"
      }
    },
    emptyOutDir: false
  }
});
