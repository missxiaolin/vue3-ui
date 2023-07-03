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

## 多选框组
`<l-checkbox-group>` 和 `<l-checkbox>` 配合使用即可
```vue demo
<template>
    <div>
        <l-checkbox-group v-model="checkList"  @change="groupChange">
            <l-checkbox  label="tired"></l-checkbox>
            <l-checkbox  label="emo"></l-checkbox>
            <l-checkbox  label="happy"></l-checkbox>
            <l-checkbox  label="funny"></l-checkbox>
        </l-checkbox-group>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        const groupChange = (val) => {
            console.log("groupChange变化后的值：",val)
        }
        return{
            groupChange,
            checkList: ref(['tired']),
        }
    }
})
</script>
```

## 多选框组带边框
在`<l-checkbox-group>`添加`border`属性即可
```vue demo
<template>
    <div>
    <l-row vertical :cols="1">
        <l-col>
            <l-checkbox-group v-model="checkList" border @change="groupChange">
                <l-checkbox  label="tired"></l-checkbox>
                <l-checkbox  label="emo"></l-checkbox>
                <l-checkbox  label="happy"></l-checkbox>
                <l-checkbox  label="funny"></l-checkbox>
            </l-checkbox-group>
        </l-col>
        <l-col>
            <l-checkbox-group v-model="checkList" border @change="groupChange" size="small">
                <l-checkbox  label="tired"></l-checkbox>
                <l-checkbox  label="emo"></l-checkbox>
                <l-checkbox  label="happy"></l-checkbox>
                <l-checkbox  label="funny"></l-checkbox>
            </l-checkbox-group>
        </l-col>
    </l-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        const groupChange = (val) => {
            console.log("groupChange变化后的值：",val)
        }
        return{
            groupChange,
            checkList: ref(['tired']),
        }
    }
})
</script>
```
## 多选框组禁用
在`<l-checkbox-group>`添加`disabled`属性即可
```vue demo
<template>
    <div>
        <l-checkbox-group v-model="checkList" disabled @change="groupChange">
            <l-checkbox  label="tired"></l-checkbox>
            <l-checkbox  label="emo"></l-checkbox>
            <l-checkbox  label="happy"></l-checkbox>
            <l-checkbox  label="funny"></l-checkbox>
        </l-checkbox-group>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        const groupChange = (val) => {
            console.log("groupChange变化后的值：",val)
        }
        return{
            groupChange,
            checkList: ref(['tired']),
        }
    }
})
</script>
```
## 多选框组单个禁用
在`<l-checkbox>`添加`disabled`属性即可，e-checkbox-group属性优先于e-check-box
```vue demo
<template>
    <div>
        <l-checkbox-group v-model="checkList" @change="groupChange">
            <l-checkbox label="tired"></l-checkbox>
            <l-checkbox disabled  label="emo"></l-checkbox>
            <l-checkbox  label="happy"></l-checkbox>
            <l-checkbox  label="funny"></l-checkbox>
        </l-checkbox-group>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        const groupChange = (val) => {
            console.log("groupChange变化后的值：",val)
        }
        return{
            groupChange,
            checkList: ref(['tired']),
        }
    }
})
</script>
```

## 中间状态
`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
```vue demo
<template>
  <l-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" >全选</l-checkbox>
  <l-checkbox-group v-model="checkedMood" @change="handleCheckedMoodsChange">
    <l-checkbox v-for="mood in moods" :key="mood" :label="mood">{{ mood }}</l-checkbox>
  </l-checkbox-group>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent ({
    setup() {
        const state = reactive({
            checkAll: false,
            checkedMood: ['emo'],
            moods: ['emo', 'tired', 'happy', 'funny'],
            isIndeterminate: true,
        })
        const handleCheckAllChange = (val) => {
            state.checkedMood = val ? state.moods : []
            state.isIndeterminate = false
        }
        const handleCheckedMoodsChange = (value) => {
            const checkedCount = value.length
            state.checkAll = checkedCount === state.moods.length
            state.isIndeterminate = checkedCount > 0 && checkedCount < state.moods.length
        }
        return {
            ...toRefs(state),
            handleCheckAllChange,
            handleCheckedMoodsChange,
        }
    }
})
</script>
```



### 属性
| 属性	                 | 说明	                                                    | 类型	                                  |  可选值	              |  默认值      | 
|---------------------- | ----------------------------------------------           |---------------------------------------| ----------------------- |  ---------- |
|  v-model	            | 选中项绑定值	                                             |   string / number / boolean            |  —	                     |     —       |
|  name                 | 原生 name 属性                                            |   string                               |  —                      |     —       |
|  true-value           | 选中时的值,当使用类似 1 和 0 来判断是否选中时会很有用            |   string / number                     |  —                      |    —        |
|  false-value          | 没有选中时的值,当使用类似 1 和 0 来判断是否选中时会很有用         |   string / number                     |  —                      |    —        | 
|  disabled             | 是否禁用多选框                                              |	 boolean                              | —                       |      —      |
|  size                 | Checkbox 的尺寸                                           |	string                              | medium / small / mini    |      —      |
|  border               | 是否显示边框                                               |	 boolean                             | —                        |      —      |
|  label                | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）|   string / number / boolean / object | —                        |      —      |
|  indeterminate        | 设置 indeterminate 状态，只负责样式控制                       |   boolean                            | —                        |      —      |

## Checkbox 事件

| 事件名称    | 描述                                     | 回调参数           |
| ---------- | --------------------------------------- | ----------------- |
| change     | 当绑定值变化时触发的事件                    | value             |


## Checkbox 插槽

| 插槽名 | 说明       |
| ----  | --------  |
| —     | 自定义内容  |

## Checkbox-Group 属性
| 属性	                 | 说明	                                           | 类型	                       |  可选值	              |  默认值      | 
|---------------------- | ----------------------------------------------  |----------------------------- | ----------------------- |  ---------- |
|  v-model	            | 选中项绑定值	                                    |  string / number / boolean   |  —	                     |     —       |
|  disabled             | 是否禁用多选框                                     |	 boolean                   | —                        |      —      |
|  size                 | Checkbox 的尺寸                                   |	 string                   | medium / small / mini    |      —      |
|  border               | 是否显示边框                                       |	 boolean                   | —                        |      —      |

## Checkbox-Group 事件

| 事件名称    | 描述                                     | 回调参数           |
| ---------- | --------------------------------------- | ----------------- |
| change     | 当绑定值变化时触发的事件                    | value             |

## Checkbox-Group 插槽

| 插槽名 | 说明       | 子标签                      |
| ----  | --------  | -------------------------- |
| —     | 自定义内容  | Checkbox / Checkbox-button |