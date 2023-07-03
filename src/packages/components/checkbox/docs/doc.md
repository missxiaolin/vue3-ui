# Checkbox 多选框
基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

## 基础用法

在 `<l-checkbox>` 元素中使用 `v-model` 绑定变量即可。

```vue demo
<template>
    <l-checkbox v-model="checked"   label="tired"></l-checkbox>
    <l-checkbox v-model="checked1" size="medium" label="emo"></l-checkbox>
    <l-checkbox v-model="checked2" size="small"  label="happy"></l-checkbox>
    <l-checkbox v-model="checked3" size="mini"   label="funny"></l-checkbox>
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


## 禁用状态

在 `<l-checkbox>` 元素中添加 `disabled` 属性即可，

```vue demo
<template>
    <l-checkbox v-model="checked"  label="tired" disabled></l-checkbox>
    <l-checkbox v-model="checked1" label="emo" disabled></l-checkbox>
    <l-checkbox v-model="checked2" label="happy"></l-checkbox>
    <l-checkbox v-model="checked3" label="funny"></l-checkbox>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        return{
            checked: ref(true),
            checked1: ref(false),
            checked2: ref(false),
            checked3: ref(false)
        }
    }
})
</script>
```

## 带有边框

在 `<l-checkbox>` 元素中添加 `border` 属性即可，

```vue demo
<template>
    <l-checkbox v-model="checked"  border label="tired"></l-checkbox>
    <l-checkbox v-model="checked1" border label="emo"></l-checkbox>
    <l-checkbox v-model="checked2" border label="happy"></l-checkbox>
    <l-checkbox v-model="checked3" border label="funny"></l-checkbox>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        return{
            checked: ref(true),
            checked1: ref(false),
            checked2: ref(false),
            checked3: ref(false)
        }
    }
})
</script>
```

## Checkbox 事件

`change` 事件在`<l-checkbox>`选定值发生变化时候触发，并将结果抛出
```vue demo
<template>
    <l-checkbox v-model="checked" @change="checkedChange"  border label="tired"></l-checkbox>
    <l-checkbox v-model="checked1" border label="emo"></l-checkbox>
    <l-checkbox v-model="checked2" border label="happy"></l-checkbox>
    <l-checkbox v-model="checked3" border label="funny"></l-checkbox>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        const checkedChange = (val:String | Boolean)=>{
            console.log("返回值为：",val)
        }
        return{
            checked: ref(true),
            checked1: ref(false),
            checked2: ref(false),
            checked3: ref(false),
            checkedChange
        }
    }
})
</script>
```