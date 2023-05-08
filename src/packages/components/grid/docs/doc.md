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

### labelWidth 宽度设置
设置`l-row`的`labelWidth`属性，统一设置 label 宽度 ,

设置`l-col`的`labelWidth`属性，设置对应 label 宽度,

属性类型 `String | Number` 如： `label-width="90px"`, `label-width="90"`,`:label-width="90"`
```vue demo
<template>
  <div class="md-layout">
    <l-row :cols="4" :label-width="90">
      <l-col label="中文姓名">000</l-col>
      <l-col label="年龄">100</l-col>
      <l-col label="身高">200</l-col>
      <l-col label="体重" label-width="120px">300</l-col>
    </l-row>
  </div>
</template>

```