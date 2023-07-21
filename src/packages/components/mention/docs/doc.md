# Mention 提及
通过`@`提及 ,`@@` 抄送
### 基本用法
通过`members`配置提及人列表，通过`v-model`获取输入内容`html`格式。`v-model:text`获取输入纯文本内容。`v-model:mention`获取当前`@`和`@@`列表。

```vue demo
<template>
    <l-row :cols="2">
        <l-col>
            <l-mention :members="values" v-model="value1" v-model:text="value1Text" v-model:mention="mentionList" placeholder="@请输入文本" clearable></l-mention>
        </l-col>
    </l-row>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
let value1 = ref(''),
    value1Text = ref(''),
    mentionList = ref([]);

watch(value1, (n)=>{
    console.log('value1----', value1)
})
watch(value1Text, (n)=>{
    console.log('value1Text----', value1Text)
})
watch(mentionList,(n)=>{
    console.log('mentionList---', mentionList)
})
const values = ref([
    {
        userName: '张三',
        userCode: '',
        post: ''
    },
    {
        userName: '李四',
        userCode: 'GSZN0002',
        post: '销售专员'
    },
    {
        userName: '赵六',
        userCode: 'GSZN0003',
        post: '销售专员'
    },
    {
        userName: '钱八',
        userCode: 'GSZN0004',
        post: '销售专员'
    },
    {
        userName: '孙氏',
        userCode: 'GSZN0005',
        post: '销售专员'
    },
    {
        userName: '刘十三', // 选项的key，搜索项
        userCode: 'GSZN0006', // 选项的英文名
        post: '销售专员'
    }
])
</script>

```