# loading-bar 组件

>如果你想使用加载条，你需要把调用其方法的组件放在 `loadingbar` 组件内部并注入 `loadingbar`

例：在App.vue里最外面包一层l-loading-bar组件
``` html
  <l-loading-bar :loading-bar-style="{ loading: {}, error: {} }"" to="html">
    <router-view></router-view>
  </l-loading-bar>
```

