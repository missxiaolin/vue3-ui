# Popover 气泡卡片
### 基础用法
与Tooltip相似，Popover也是基于`EPopper`的构建。 因此对于重复属性，请参考 `Tooltip` 的文档，在此文档中不做详尽解释。

`trigger`属性用于定义`popover`的触发方式：`hover`，`click`，`focus` 或者`manual`。


## 基础用法

```vue demo
<template>
  <l-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button>Hover to activate</l-button>
    </template>
  </l-popover>

  <l-popover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button>Click to activate</l-button>
    </template>
  </l-popover>

  <l-popover
    ref="popover"
    placement="right"
    title="Title"
    :width="200"
    trigger="focus"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button>Focus to activate</l-button>
    </template>
  </l-popover>

  <l-popover
    v-model:visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button @click="visible = !visible">Manual to activate</l-button>
    </template>
  </l-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

```