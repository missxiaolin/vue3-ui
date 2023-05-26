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