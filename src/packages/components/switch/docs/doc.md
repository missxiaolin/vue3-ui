# swicth开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 v-model 到一个 Boolean 类型的变量。 可以使用 active-color 属性与 inactive-color 属性来设置开关的背景色

```vue demo
<template>
  <l-switch v-model="value1" />
  <l-switch
    v-model="value2"
    class="ml-2"
    active-color="#13ce66"
    inactive-color="#ff4949"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>

```