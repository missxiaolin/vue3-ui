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

## 尺寸

```vue demo
<template>
  <l-switch
    v-model="value"
    size="large"
    active-text="Open"
    inactive-text="Close"
  />
  <br />
  <l-switch v-model="value" active-text="Open" inactive-text="Close" />
  <br />
  <l-switch
    v-model="value"
    size="small"
    active-text="Open"
    inactive-text="Close"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(true)
</script>

```

## 文字描述

使用active-text属性与inactive-text属性来设置开关的文字描述。 使用 inline-prompt 属性来控制文本是否显示在点内。

使用active-text属性与inactive-text属性来设置开关的文字描述。

```vue demo
<template>
  <l-switch
    v-model="value1"
    class="mb-2"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <l-switch
    v-model="value2"
    class="mb-2"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <l-switch
    v-model="value3"
    inline-prompt
    active-text="是"
    inactive-text="否"
  />
  <l-switch
    v-model="value4"
    class="ml-2"
    inline-prompt
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="Y"
    inactive-text="N"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
</script>

```

## 显示自定义图标

> 使用 inactive-icon 和 active-icon 属性来添加图标。 您可以传递icon组件的名称(字符串)。 字符串可以在 icon component 查看。

**仅可添加eui里存在的icon**  
使用 inactive-icon 和 active-icon 属性来添加图标。 使用 inline-prompt 属性来控制图标显示在点内。

```vue demo
<template>
  <l-switch v-model="value1" active-icon="chenggong" inactive-icon="cuowuguanbishibai" />
  <br />
  <l-switch
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    active-icon="chenggong"
    inactive-icon="cuowuguanbishibai"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
const value2 = ref(true)
</script>

```

## 扩展的 value 类型

设置active-value和inactive-value属性，接受Boolean, String或Number类型的值。 接受Boolean, String或Number类型的值。

```vue demo
<template>
  <l-tooltip :content="'Switch value: ' + value" placement="top">
    <l-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-value="100"
      inactive-value="0"
    />
  </l-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
</script>

```

## 禁用状态

设置disabled属性，接受一个Boolean，设置true即可禁用。

```vue demo
<template>
  禁用：<l-switch v-model="value1" disabled=true /><br>
  启用：<l-switch v-model="value2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>

```

## 属性

|属性|说明|类型|可选值|默认值|
|---- |----|----|----|----|
|mode-value / v-model|绑定值，必须等于 active-value 或 inactive-value，默认为 Boo|lean 类型|boolean / string / number|—|—|
|disabled|是否禁用|boolean|—|false|
|loading|是否显示加载中|boolean|—|false|
|size|switch 的大小|string|large / default / small|default|
|width|switch 的宽度|number|—|40|
|inline-prompt|无论图标或文本是否显示在点内，只会呈现文本的第一个字符|boolean|—|false|
|active-icon|switch 状态为 on 时所显示图标，设置此项会忽略 active-text|string(仅支持eui存在的icon)|—|—|
|inactive-icon|switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text|string(仅支持eui存在的icon)|—|—|
|active-text|switch 打开时的文字描述|string|—|—|
|inactive-text|switch 的状态为 off 时的文字描述|string|—|—|
|active-value|switch 状态为 on 时的值|boolean / string / number|—|true|
|inactive-value|switch的状态为 off 时的值|boolean / string / number|—|false|
|active-color|switch的值为 on 时的颜色|string|—|#409EFF|
|inactive-color|switch的值为 off 的颜色|string|—|#C0CCDA|
|border-color|switch 边框颜色|string|—|—|
|name|switch 对应的 name 属性|string|—|—|
|validate-event|改变 switch 状态时是否触发表单的校验|boolean|—|true|
|before-change|switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换|function|—|—|

## 事件

|事件名|说明|回调参数|
|----|----|----|
|change|switch 状态发生变化时的回调函数|val，新状态的值|

## 方法

|方法|说明|参数|
|----|----|----|
|focus|使 Switch 获取焦点|—|