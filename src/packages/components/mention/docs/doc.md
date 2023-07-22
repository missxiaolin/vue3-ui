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
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '赵六',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '钱八',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '孙氏',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '刘十三', // 选项的key，搜索项
        userCode: '1', // 选项的英文名
        post: '销售专员'
    }
])
</script>

```

### 支持抄送
配置`follower`开启抄送人功能人列表，输入`@@`激活。

```vue demo
<template>
    <l-row :cols="2">
        <l-col>
            <l-mention :members="values" v-model="value1" v-model:text="value1Text" v-model:mention="mentionList" placeholder="@@请输入文本" follower :to="false" clearable></l-mention>
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
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '李四',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '赵六',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '钱八',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '孙氏',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '刘十三', // 选项的key，搜索项
        userCode: '1', // 选项的英文名
        post: '销售专员'
    }
])
</script>

```
### 文本区域
配置`type="textarea"`
```vue demo
<template>
    <l-row :cols="2">
        <l-col>
            <l-mention :members="values" v-model="value1" placeholder="请输入文本" follower clearable type="textarea"></l-mention>
        </l-col>
  
    </l-row>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
let value1 = ref('');
const values = ref([
    {
        userName: '张三',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '李四',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '赵六',
        userCode: '2',
        post: '销售专员'
    },
    {
        userName: '钱八',
        userCode: '3',
        post: '销售专员'
    },
    {
        userName: '孙氏',
        userCode: '2',
        post: '销售专员'
    },
    {
        userName: '刘十三', // 选项的key，搜索项
        userCode: '1', // 选项的英文名
        post: '销售专员'
    }
])
</script>

```

### 远程加载
异步加载选项。

```vue demo
<template>
    <l-row :cols="2">
        <l-col>
            <l-mention :members="handleSearch" v-model="value1" v-model:text="value1Text" v-model:mention="mentionList" placeholder="@@请输入文本" clearable></l-mention>
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
const members = [
    {
        userName: '张三',
        userCode: '1',
        post: '销售专员'
    },
    {
        userName: '李四',
        userCode: '2',
        post: '销售专员'
    },
    {
        userName: '赵六',
        userCode: '3',
        post: '销售专员'
    },
    {
        userName: '钱八',
        userCode: '4',
        post: '销售专员'
    },
    {
        userName: '孙氏',
        userCode: '5',
        post: '销售专员'
    },
    {
        userName: '刘十三', // 选项的key，搜索项
        userCode: '6', // 选项的英文名
        post: '销售专员'
    }
]
const handleSearch = (queryString, cb)=>{
    setTimeout(()=>{
        const result = members.filter(item=> item.userName.includes(queryString))
        cb(result)
    },1000)
}
</script>

```

### Mention 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|modelValue / v-model	| 绑定值HTMLElement类型的值	| string[HTMLElement]	| - |	- |
|v-model:text	| 绑定值HTMLText类型的值	| string[HTMLText]	| - |	- |
|v-model:mention	| 绑定提及人的列表, `to`为提及人，`follower`为抄送人	| object	| {to:[], follower:[]} |	- |
|placeholder	|占位文本	|string	|—	|—|
|clearable	|是否可清空|	boolean	|—|	false|
|type	| 输入框类型	| string	| input, textarea |	input |
|members | 提及人列表。支持`array` 和 `funtion`, `function`通过调用 `callback(data:[])` | array / Function(queryString, cb)	| - |	- |

### Mention 事件
|事件名	|说明	|参数|
|------|----|----|
|blur	|在 Input 失去焦点时触发	|(event: Event)|
|focus|	在 Input 获得焦点时触发	|(event: Event)|
|change	|仅在输入框失去焦点或用户按下回车时触发	|(value: string | number)|
|input	|在 Input 值改变时触发	|(value: string | number)|
|clear	|在点击由 clearable 属性生成的清空按钮时触发|	—|