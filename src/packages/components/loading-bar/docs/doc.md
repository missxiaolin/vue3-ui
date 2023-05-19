# loading-bar 组件

>如果你想使用加载条，你需要把调用其方法的组件放在 `loadingbar` 组件内部并注入 `loadingbar`

例：在App.vue里最外面包一层l-loading-bar组件
``` html
  <l-loading-bar :loading-bar-style="{ loading: {}, error: {} }"" to="html">
    <router-view></router-view>
  </l-loading-bar>
```


## loading-bar 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| loading-bar-style | 加载条样式 | string / object | -  | undefined |
| to | 挂载节点 | Object | -  | body |

## loading-bar 事件
|事件名	|说明	|参数|
|--- | ---- | ---- |
|error|加载条显示错误|---|
|finish|加载条结束|---|
|start|加载条开始|---|
