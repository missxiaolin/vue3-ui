# Checkbox 多选框
基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

## 基础用法

在 `<l-check-box>` 元素中使用 `v-model` 绑定变量即可。

```vue demo
<template>
    <l-check-box v-model="checked"   label="tired"></l-check-box>
    <l-check-box v-model="checked1" size="medium" label="emo"></l-check-box>
    <l-check-box v-model="checked2" size="small"  label="happy"></l-check-box>
    <l-check-box v-model="checked3" size="mini"   label="funny"></l-check-box>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        return{
            checked: ref(['tired']),
            checked1: ref(false),
            checked2: ref(false),
            checked3: ref(false)
        }
    }
})
</script>
```
