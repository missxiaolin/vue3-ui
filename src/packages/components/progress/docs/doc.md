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

### 环形进度条
Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。
```vue demo
<template>
  <div class="demo-progress">
    <l-progress type="circle" :percentage="0" />
    <l-progress type="circle" :percentage="25" />
    <l-progress type="circle" :percentage="100" status="success" />
    <l-progress type="circle" :percentage="70" status="warning" />
    <l-progress type="circle" :percentage="50" status="exception" />
  </div>
</template>
```


### 自定义内容
通过默认插槽添加自定义内容。
```vue demo
<template>
  <div class="demo-progress">
    <l-progress :percentage="50">
      <l-button type="text">Content</l-button>
    </l-progress>
    <l-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    >
      <span>Content</span>
    </l-progress>
    <l-progress type="circle" :percentage="100" status="success">
      <l-button type="success" icon="l-zhengque" circle />
    </l-progress>
    <l-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </l-progress>
  </div>
</template>

```

### 动画进度条
使用 `intermediate` 属性来设置不确定的进度， `duration` 来控制动画持续时间。
```vue demo
<template>
  <div class="demo-progress">
    <l-progress :percentage="50" :indeterminate="true" />
    <l-progress :percentage="100" :format="format" :indeterminate="true" />
    <l-progress
      :percentage="100"
      status="success"
      :indeterminate="true"
      :duration="5"
    />
    <l-progress
      :percentage="100"
      status="warning"
      :indeterminate="true"
      :duration="1"
    />
    <l-progress :percentage="50" status="exception" :indeterminate="true" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>
```


## Progress 属性
| 属性	| 说明	| 类型	| 可选值| 	默认值| 
| -----| -----| ----| -----| -----| 
| percentage| 	百分比，必填| 	number| 	0-100	| 0| 
| type| 	进度条类型	| string| 	line/circle/dashboard	| line| 
| stroke-width	| 进度条的宽度| 	number| 	—| 	6| 
| text-inside| 	进度条显示文字内置在进度条内（仅 type 为 'line' 时可用）| 	boolean	| —	| false| 
| status	| 进度条当前状态| 	string	| success/exception/warning	| —| 
| indeterminate	| 是否为动画进度条| 	boolean	| -	| false| 
| duration	| 控制动画进度条速度| 	number| 	-	| 3| 
| color| 	进度条背景色 进度条背景色 | （会覆盖 status 状态颜色）| 	string/function/array| 	—	| ''| 
| width	| 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）| 	number	| —	| 126| 
| show-text	| 是否显示进度条文字内容| 	boolean| 	—	| true| 
| stroke-linecap| 	circle/dashboard 类型路径两端的形状	| string| 	butt/round/square| 	round| 
| format| 	指定进度条文字内容| 	function(percentage)| 	—| 	—| 
## Progress 插槽
| 插槽名| 	说明| 
| ---| ----| 
| default| 	自定义内容，参数为 { percentage }| 