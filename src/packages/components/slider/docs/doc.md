
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