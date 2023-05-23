## Panel 卡片
将信息聚合在卡片容器中展示。

### 基础用法
卡片包含标题，内容以及操作区域。

Panel 组件由 `title` 、 `body` 和  `footer` 组成。 `title`、`footer` 是可选的，其内容取决于一个具名的 slot。

```vue demo
<template>
  <l-panel title="panel title" border :close="true">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </l-panel>
</template>
```
