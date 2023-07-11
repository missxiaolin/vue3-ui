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