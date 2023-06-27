# Radio 单选框

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。

要使用 `Radio` 组件，只需要设置`v-model`绑定变量， 选中意味着变量的值为相应 `Radio` `label`属性的值， label可以是`String`、`Number` 或 `Boolean`。

```vue demo
<template>
    <div>
        <l-radio v-model="radio" name="A" label="1">选项 A</l-radio>
        <l-radio v-model="radio" name="A" label="2">选项 B</l-radio>
        <l-radio v-model="radio" name="A" label="3">选项 C</l-radio>
        <l-radio v-model="radio" name="A" label="4">选项 D</l-radio>
    </div>
</template>
<script lang="ts">
    import { defineComponent, watch, ref } from 'vue'
    export default defineComponent({
        setup() {
            const radio = ref('1');
            watch(radio,(newVal,oldVal)=>{
                console.log('新的值=》',newVal,'老的值=》',oldVal)
            })
            return{radio} 
        }
    })  
</script>
```