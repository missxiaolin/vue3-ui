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
### 简单卡片
卡片可以只有内容区域。

```vue demo
<template>
<div style="padding: 30px; background-color: #f5f6f9">
  <l-panel shadow="hover" head-gray>
    <template #title>
      <span>panel name</span>
    </template>
    <template #panel>
      <e-button type="text">Operation button</e-button>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </l-panel>
  </div>
</template>
```

### 简单卡片
卡片可以只有内容区域。

```vue demo
<template>
  <l-panel title="title" border>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </l-panel>
</template>
```

### 带有阴影效果的卡片
你可以定义什么时候展示卡片的阴影效果。

通过 shadow 属性设置卡片阴影出现的时机。 该属性的值可以是：always、hover或never。
```vue demo
<template>
  <l-row :cols="3">
    <l-col>
      <l-panel shadow="always"> Always </l-panel>
    </l-col>
    <l-col>
      <l-panel shadow="hover" border> Hover </l-panel>
    </l-col>
    <l-col>
      <l-panel shadow="never" border> Never </l-panel>
    </l-col>
  </l-row>
</template>
```

### 属性
 | 属性	 | 说明	 | 类型	 | 可选值	 | 默认值 | 
 | ---- | ----- |------ |---  |---- |
 | title	 | 卡片的标题 你既可以通过设置 title 来修改标题，也可以通过 slot#title 传入 DOM 节点	 | string | 	— | 	— | 
 | panel	 | 卡片右侧操作区 slot#panel 传入 DOM 节点	 | string | 	— | 	— | 
 | body-style	 | body 的样式	 | object | 	—	 | { padding: '15px' } | 
 | shadow	 | 设置阴影显示时机	 | string	 | always / hover / never	 | hover | 
 | border | 描边线条 | boolean | - | false |
|show-close|	是否显示关闭按钮|	boolean	|—	|true|
|close|	配合`show-close`设置卡片内容默认是否收起|	boolean	|—	|false|
