# 快速上手

## NPM 安装

#### Vite 构建工具 通过 vite-plugin 使用按需加载

#### 为什么只按需引入样式

由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。

[Vite](https://vitejs.dev/) 构建工具，使用 [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) 实现按需引入。

##### 安装插件
``` bash
npm install vite-plugin-style-import --save-dev
```
在 `vite.config` 中添加配置：
``` javascript
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
export default {
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'lui',
          libraryNameChangeCase: 'pascalCase',
          resolveStyle: (name) => {
            return `lui/dist/packages/${name}/index.scss`
          }
        }
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 配置 eui 全局 scss 变量
        additionalData: `@import "lui/dist/theme-chalk/variables.scss";`
      }
    }
  }
};
```
#### EMbPack 构建工具 通过 babel 使用按需加载

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。
##### 安装插件
``` bash
npm install babel-plugin-import --save-dev
```
在 `.babelrc` 或 `babel.config.js` 中添加配置：
``` javascript
{
  // ...
  plugins: [
    [
      "import",
      {
        "libraryName": "lui",
        "libraryDirectory": "dist/packages/_es",
        "camel2DashComponentName": false
      },
      'lui3-vue'
    ]
  ]
}
```
接着像这样在代码中直接引入组件。

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { Button, Icon } from "eui";
import "lui/libs/index.css";
createApp(App).use(Button).use(Icon).mount("#app");
```