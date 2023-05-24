# Tabs 标签页
用于分割内容上有关联但属于不同类别的数据集合

### 基础用法
基础的、简洁的标签页

Tabs 组件提供了选项卡的功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

``` vue demo
<template>
  <l-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <l-tab-pane label="User" name="first">User</l-tab-pane>
    <l-tab-pane label="Config" name="second">Config</l-tab-pane>
    <l-tab-pane label="Role" name="third">Role</l-tab-pane>
    <l-tab-pane label="Task" name="fourth">Task</l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event)
}

</script>

```