# Progress 进度条
用于展示操作进度，告知用户当前状态和预期。

### 直线进度条
Progress 组件设置 `percentage`属性即可，表示进度条对应的百分比 该属性必填，并且必须在 `0-100`范围内。 You can custom text format by setting `format`.

```vue demo
<template>
  <div class="demo-progress">
    <l-progress :percentage="50" />
    <l-progress :percentage="100" :format="format" />
    <l-progress :percentage="100" status="success" />
    <l-progress :percentage="100" status="warning" />
    <l-progress :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>
```

### 进度条内显示百分比标识
百分比不占用额外控件，适用于文件上传等场景。

Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字。
```vue demo
<template>
  <div class="demo-progress">
    <l-progress :text-inside="true" :stroke-width="26" :percentage="70" />
    <l-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    />
    <l-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    />
    <l-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    />
  </div>
</template>
```

### 自定义进度条的颜色#
可以通过 `color` 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值，函数和数组。
```vue demo
<template>
  <div class="demo-progress">
    <l-progress :percentage="percentage" :color="customColor" />

    <l-progress :percentage="percentage" :color="customColorMethod" />

    <l-progress :percentage="percentage" :color="customColors" />
    <l-progress :percentage="percentage" :color="customColors" />
    <div>
      <l-button-group>
        <l-button icon="l-jianshao" @click="decrease" />
        <l-button icon="l-zengjia" @click="increase" />
      </l-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(20)
const customColor = ref('#409eff')

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399'
  }
  if (percentage < 70) {
    return '#e6a23c'
  }
  return '#67c23a'
}
const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}
</script>


```