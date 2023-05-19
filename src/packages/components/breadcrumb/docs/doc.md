
# breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

### 基础用法

在 l-breadcrumb 中使用 l-breadcrumb-item 标签表示从首页开始的每一级，一般用在⻚面，分隔符默认：>

```vue demo
<template>
  <l-breadcrumb>
    <l-breadcrumb-item :to="{ path: '/' }">首页</l-breadcrumb-item>
    <l-breadcrumb-item>
      <a href="/">某某列表某某列表某某列表某某列表</a>
    </l-breadcrumb-item>
    <l-breadcrumb-item>某某详情</l-breadcrumb-item>
  </l-breadcrumb>
</template>
```

### 自定义分隔符

通过设置 separator-class 可使用相应的 iconfont 作为分隔符

```vue demo
<template>
  <l-breadcrumb  :separator-icon="'l-youbian'">
    <l-breadcrumb-item :to="{ path: '/' }">开始</l-breadcrumb-item>
    <l-breadcrumb-item>
      <a href="/">第一步</a>
    </l-breadcrumb-item>
    <l-breadcrumb-item>第二步</l-breadcrumb-item>
  </l-breadcrumb>
</template>
```

## Breadcrumb 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| separator-icon | 图标分隔符的组件或组件名 | string / Component | -  | e-icon-right |

## Breadcrumb 插槽
|名称|	说明| 子标签|
|---|----|----|
| -  | 自定义默认内容 | Breadcrumb Item|

## Breadcrumb Item 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| to | 路由跳转目标，同 vue-router 的 to属性	 | string/object| -  | - |
| replace | 如果设置该属性为 true, 导航将不会留下历史记录	 | boolean | -  |	false |
## Breadcrumb Item 插槽
|名称|	说明|
|---|----|
| -  | 自定义默认内容 |