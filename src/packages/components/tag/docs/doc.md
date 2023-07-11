# Tag 标签
标签

### 基础用法

```vue demo
<template>
  <l-tag>Tag 1</l-tag>
  <l-tag type="success">Tag 2</l-tag>
  <l-tag type="warning">Tag 3</l-tag>
  <l-tag type="info">Tag 4</l-tag>
  <l-tag type="danger">Tag 5</l-tag>
</template>
```

### 可移除标签
设置 closable 属性可以定义一个标签是否可移除。当 Tag 被移除时会触发 close 事件。
```vue demo
<template>
  <l-tag v-for="(item, index) in tagList" :key="index" closable
    @click="handleTagClick(index)" @close="handleTagClose(index)">{{ item }}</l-tag>
  <l-button style="margin-left: 8px;" size="mini" @click="handleAddTag">增加标签</l-button>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const tagList = ref([
        'tag 1', 'tag 2', 'tag 3'
      ])
      function handleTagClick(index) {
        console.log('tag index: ', index)
      }
      function handleTagClose(index) {
        tagList.value.splice(index, 1)
        console.log(`tag ${index} closed`)
      }
      function handleAddTag() {
        tagList.value.push(`tag ${Math.floor(Math.random() * 10)}`)
      }
      return {
        tagList,
        handleTagClick,
        handleTagClose,
        handleAddTag,
      }
    },
  })
</script>
```

### 不同尺寸
使用 `size` 设置标签大小 默认default
```vue demo
<template>
  <l-tag size="medium">Medium Tag</l-tag>
  <l-tag>Default Tag</l-tag>
  <l-tag size="small">Small Tag</l-tag>
  <l-tag size="mini">Mini Tag</l-tag>
</template>
```
### 主题
Tag组件提供了三个不同的主题：`light`、`fill` 和 `plain`，默认为 `light`。
```vue demo
<template>
  <div>
    <l-tag effect="fill" closable>Tag 1</l-tag>
    <l-tag effect="fill" type="success">Tag 2</l-tag>
    <l-tag effect="fill" type="warning">Tag 3</l-tag>
    <l-tag effect="fill" type="info">Tag 4</l-tag>
    <l-tag effect="fill" type="danger">Tag 5</l-tag>
  </div>
  <div style="margin-top: 8px;">
    <l-tag effect="plain" closable>Tag 1</l-tag>
    <l-tag effect="plain" type="success">Tag 2</l-tag>
    <l-tag effect="plain" type="warning">Tag 3</l-tag>
    <l-tag effect="plain" type="info">Tag 4</l-tag>
    <l-tag effect="plain" type="danger">Tag 5</l-tag>
  </div>
</template>
```

### 属性
 | 属性	 | 说明	 | 类型	 | 可选值	 | 默认值 | 
 | ---- | ----- |------ |---  |---- |
 | type	 | 类型	 | string | success/warning/info/danger |	— | 
 | closable | 是否可关闭 | boolean	 | -	 | false |
 | color | 背景色 | string | — | — |
 | size	 | 尺寸 | string	 | medium / small / mini	 | —  |
 | effect	 | 主题 | string	 | light / fill / plain	 |  light |
 | hit | 显示边框 | boolean | — | false |

### 事件
| 事件名 | 说明	|	回调参数 |
|---- |----- |------ |
| click | 点击 Tag 时触发的事件 | — |
| close | 关闭 Tag 时触发的事件 | — |