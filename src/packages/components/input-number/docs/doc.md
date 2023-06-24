# Input Number 数字输入框

使用鼠标或键盘输入一定范围的标准数值，自带防爆点击。

## 基础用法

在  `<l-input-number>` 元素中使用 `v-model` 绑定变量即可，变量的初始值即为默认值。

```vue demo
<template>
    <l-input-number v-model="number"></l-input-number>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        return{
            number: ref(0)
        }
    }
})
</script>

```