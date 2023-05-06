# LayOut 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<l-container>`：外层容器。 当子元素中包含 `<l-header>` 或 `<l-footer>` 时，全部子元素会垂直上下排列， 否则会水平左右排列。
`<l-header>`：顶栏容器。
`<l-aside>`：侧边栏容器。
`<l-main>`：主要区域容器。
`<l-footer>`：底栏容器。

> 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， `<l-container>`的直接子元素必须是后四个组件中的一个或多个。 后四个组件的亲元素必须是一个 `<l-container>`

### 常见页面布局
```vue demo
<template>
  <div class="md-layout">
    <l-container>
      <l-header>Header</l-header>
      <l-main>Main</l-main>
    </l-container>

    <l-container>
      <l-header>Header</l-header>
      <l-main>Main</l-main>
      <l-footer>Footer</l-footer>
    </l-container>

    <l-container>
      <l-aside width="200px">Aside</l-aside>
      <l-main>Main</l-main>
    </l-container>

    <l-container>
      <l-header>Header</l-header>
      <l-container>
        <l-aside width="200px">Aside</l-aside>
        <l-main>Main</l-main>
      </l-container>
    </l-container>

    <l-container>
      <l-header>Header</l-header>
      <l-container>
        <l-aside width="200px">Aside</l-aside>
        <l-container>
          <l-main>Main</l-main>
          <e-footer>Footer</e-footer>
        </l-container>
      </l-container>
    </l-container>

    <l-container>
      <l-aside width="200px">Aside</l-aside>
      <l-container>
        <l-header>Header</l-header>
        <l-main>Main</l-main>
      </l-container>
    </l-container>

    <l-container>
      <l-aside width="100px">Aside</l-aside>
      <l-container>
        <l-header>Header</l-header>
        <l-main>Main</l-main>
        <e-footer>Footer</e-footer>
      </l-container>
    </l-container>
  </div>
</template>
```

## Aside 属性

| 属性 | 说明       | 类型   | 可选值       | 默认值                                                                    |
| --------- | ------- | ------ | ------------ | ------------------------ |
| direction | l	子元素的排列方向 | string | horizontal / vertical | 子元素中有 `el-header` 或 `el-footer` 时为 `vertical`，否则为 `horizontal` |

## Container 插槽

| 插槽名 | 说明               | 	子标签                                    |
| ---- | ------------------------- | ------------------------------------------ |
| —    | 	自定义默认内容 | Container / Header / Aside / Main / Footer |

## Header 属性

| 属性 | 说明          | 类型   | 可选值 | 默认值 |
| --------- | -------------------- | ------ | --------------- | ------- |
| height    | 顶栏高度 | string | —               | 60px    |

## Header 插槽

| 插槽名 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |

## Aside 属性

| 属性 | 说明               | 类型   | 可选值 | 默认值 |
| --------- | ------------------------- | ------ | --------------- | ------- |
| width     | 侧边栏宽度 | string | —               | 300px   |

## Aside 插槽

| 插槽名 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |

## Main 插槽

| 插槽名 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |

## Footer 属性

| 属性 | 说明          | 类型   | 可选值 | 默认值 |
| --------- | -------------------- | ------ | --------------- | ------- |
| height    | 底栏高度 | string | —               | 60px    |

## Footer 插槽

| 插槽名 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |
