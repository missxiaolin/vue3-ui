# Popconfirm 气泡确认框
点击某个元素弹出一个简单的气泡确认框

### 基础用法
`Popconfirm` 的属性与 `Popover` 很类似， 因此对于重复属性，请参考 `Popover` 的文档，在此文档中不做详尽解释。

在 `Popconfirm` 中，只有 `title` 属性可用，`content` 属性不会被展示。

```vue demo
<template>
  <l-popconfirm title="Are you sure to delete this?">
    <template #reference>
      <l-button>Delete</l-button>
    </template>
  </l-popconfirm>
</template>
```