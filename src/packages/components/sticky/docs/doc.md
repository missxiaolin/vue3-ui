## Sticky 固钉
将页面元素固定在特定可视区域。

### 基础用法
固钉默认固定在页面顶部。

通过设置 `offset` 属性来改变吸顶距离，默认值为 0。
```vue demo
<template>
  <l-sticky :offset="120">
    <l-button type="primary">Offset top 120px</l-button>
  </l-sticky>
</template>
```