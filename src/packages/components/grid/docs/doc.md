## Grid

### 基础 表单布局
`label`宽度自适应，❗️不推荐的 列表搜索区域使用！
```vue demo
<template>
  <div class="md-layout">
    <l-row :cols="4">
      <l-col label="中文姓名">000</l-col>
      <l-col label="年龄">100</l-col>
      <l-col label="身高">200</l-col>
      <l-col label="体重">300</l-col>
    </l-row>
  </div>
</template>
```