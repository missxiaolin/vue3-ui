
# slider 滑块

### 介绍

通过拖动滑块在一个固定区间内进行选择


### 基础用法
在拖动滑块时，显示当前值

通过设置绑定值自定义滑块的初始值
```vue demo
<template>
  <l-row :cols="1" label-width="200">
    <l-col label="默认值">
      <l-slider v-model="value1"></l-slider>
    </l-col>
    <l-col label="自定义初始值">
      <l-slider v-model="value2"></l-slider>
    </l-col>
    <l-col label="隐藏 Tooltip">
      <l-slider v-model="value3" :show-tooltip="false"></l-slider>
    </l-col>
    <l-col label="格式化 Tooltip">
      <l-slider v-model="value4" :format-tooltip="formatTooltip"></l-slider>
    </l-col>
    <l-col label="禁用">
      <l-slider v-model="value5" disabled></l-slider>
    </l-col>
  </l-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)

const formatTooltip = (val: number) => {
  return val / 100
}
</script>
```

### 离散值
选项可以是离散的

改变 `step` 的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点
```vue demo
<template>
  <l-row :cols="1" label-width="200">
    <l-col label="不显示间断点">
      <l-slider v-model="value1" :step="10"></l-slider>
    </l-col>
    <l-col label="显示间断点">
      <l-slider v-model="value2" :step="10" show-stops></l-slider>
    </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
</script>
```

## 带有输入框的滑块
通过输入框设置精确数值

设置 `show-input` 属性会在右侧显示一个输入框
``` vue demo
<template>
  <l-row :cols="1">
    <l-slider v-model="value" show-input></l-slider>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 范围选择
支持选择某一数值范围

配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。
``` vue demo
<template>
  <l-row :cols="1">
    <l-slider v-model="value" range show-stops :max="10"></l-slider>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([4, 8])
</script>
```

## 垂直模式
配置 `vertical` 属性为 true 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

``` vue demo
<template>
  <l-row :cols="1">
    <l-slider v-model="value" vertical height="200px"></l-slider>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 显示标记
设置 `marks` 属性可以在滑块上显示标记。
``` vue demo
<template>
  <l-row :cols="1">
    <l-slider v-model="value" range :marks="marks"></l-slider>
  </l-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const value = ref([30, 60])
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
})
</script>
```

## slider 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| model-value / v-model | 选中项绑定值 | number | — | 0 |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| show-input | 是否显示输入框，仅在非范围选择时有效 | boolean | — | false |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | —  | true |
| size | 滑块的大小 | string | large / default / small | default |
| input-size | 输入框的大小，如果设置了 `size` 属性，默认值自动取 `size` | string | large / default / small | default |
| show-stops | 是否显示间断点 | boolean | — | false |
| show-tooltip | 是否显示提示信息 | boolean | — | true |
| format-tooltip | 格式化提示信息 | function(value) | —  | — |
| range | 是否开启选择范围 | boolean | — | false |
| vertical | 垂直模式 | boolean | — | false |
| height | 滑块高度，垂直模式必填 | string | — | — |
| label | 屏幕阅读器标签 | string | —  | — |
| debounce | 输入防抖延迟，单位毫秒，仅在 `show-input` 为 true 时生效 | number | — | 300 |
| tooltip-class | ctooltip 的自定义类名 | string | — | — |
| marks | 标记， 对象的键类型需为 number 且对象的值必须在 `[min, max]`闭区间内，每个标记均可自定义样式 | object | — | — |


## slider 事件
|事件名	|说明	|参数|
|----|----|---|
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | val，新状态的值 |
| input | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | val，改变后的值 |
