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

## 禁用状态

在  `<l-input-number>` 元素中添加 `disabled` 属性即可，

```vue demo
<template>
    <l-input-number v-model="number" disabled></l-input-number>
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

## 基数

在  `<l-input-number>` 元素中设置 `step` 属性即可，`:step="2"` 即以`2`为基数增长，减少；

```vue demo
<template>
    <l-input-number v-model="number" :step="2"></l-input-number>
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

## 严格步进
`<l-input-number>` 中 `step-strictly`属性接受一个`Boolean`。 如果这个属性被设置为 true，则只能输入步进的倍数。
```vue demo
<template>
    <l-input-number v-model="number" :step-strictly="true" :step="2"></l-input-number>
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

## 小数位数
`<l-input-number>` 中设置 `precision` 属性可以控制数值精度，接收一个 Number。


> `precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。


```vue demo
<template>
    <l-input-number v-model="number" :precision="2"></l-input-number>
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

## 数值范围
`<l-input-number>` 中设置 `max` 和 `min` 属性可以控制数值范围。
```vue demo
<template>
    <l-input-number v-model="number" :max="10" :min="0"></l-input-number>
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

## 无按钮
`<l-input-number>` 中设置 `controls` 属性为`false`
```vue demo
<template>
    <l-input-number v-model="number" :controls="false"></l-input-number>
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

## 右侧按钮
`<l-input-number>` 中设置 `controlsRight` 属性
```vue demo
<template>
   <l-row :cols="3">
    <l-col>
        <l-input-number v-model="number" :min="0" controlsRight size="medium"></l-input-number>
    </l-col>
    <l-col>
        <l-input-number v-model="number" :min="0" controlsRight size="small"></l-input-number>
    </l-col>
    <l-col>
        <l-input-number v-model="number" :min="0" controlsRight size="mini"></l-input-number>
    </l-col>
   </l-row>
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

## 输入框尺寸

使用 `size` 属性来控制输入框的尺寸，除默认尺寸外还有： `medium、small、mini` 三种尺寸的数字输入框

```vue demo
<template>
    <div style="display:inline-block;margin-right:10px">
        <l-input-number v-model="number"></l-input-number>
    </div>
    <div style="display:inline-block;margin-right:10px">
        <l-input-number v-model="number2" size="medium"></l-input-number>
    </div>
    <div style="display:inline-block;margin-right:10px">
        <l-input-number v-model="number3" size="small"></l-input-number>
    </div>
    <div style="display:inline-block;margin-right:10px">
        <l-input-number v-model="number4" size="mini"></l-input-number>
    </div>
   
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
    setup() {
        return{
            number: ref(0),
            number2: ref(0),
            number3: ref(0),
            number4: ref(0)
        }
    }
})
</script>

```


### 属性
| 属性	                 | 说明	                                            | 类型	              |  可选值	                 |  默认值      | 
|---------------------- | ------------------------------------------------ |------------------- | ----------------------- |  ---------- |
| v-model               | 选中项绑定值                                       | number             | —                       | —           |
| min                   | 设置计数器允许的最小值                               | number             | —                       | `-Infinity` |
| max                   | 设置计数器允许的最大值                               | number             | —                       | `Infinity`  |
| step                  | 计数器基数                                         | number             | —                       | 1           |
| step-strictly         | 是否只能输入 step 的倍数                             | boolean            | —                        | false       |
| precision             | 小数位数                                           | number             | —                       | —           |
| disabled              | 计数器是否禁用                                      | boolean            | —                       | false       |
| controls              | 是否显示控制按钮                                    | boolean             | —                      | true        |
| clickTime             | 防爆点击时间间隔                                    | number              | —                       | 100 (毫秒)   |
| controls              | 否使用控制按钮                                      | boolean             | —                      | true        |
| controlsRight         | 按钮位置是否在右侧                                   | boolean             | —                      | —           |




## 事件

| 事件名称 | 说明                     | 回掉参数                                              |
| ---------- | ------------------------------- | ----------------------------------------  |
| change     | 绑定值被改变时触发                 | (currentValue: number , oldValue: number) | 
| blur       | 在组件 EInput 失去焦点时触发        | (event: Event)                            |
| focus      | 在组件 EInput 获得焦点时触发        | (event: Event)                            |


## 方法

| 方法名 | 说明                    | 参数       |
| ------ | -----------------     | ---------- |
| focus  | 使 input 组件获得焦点    |  —        |
| blur   | 使 input 组件失去焦点    |  —        |