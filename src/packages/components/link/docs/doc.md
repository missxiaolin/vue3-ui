## 链接

### 介绍

文字超链接


### 基础用法
基础的文字链接用法。
```vue demo
<template>
  <l-row :cols="6">
    <l-col>
      <l-link href="" target="_blank">default</l-link>
    </l-col>
    <l-col>
      <l-link href="https://eboss.qa.enmonster.com" target="_blank" type="primary">primary</l-link>
    </l-col>
    <l-col>
      <l-link type="success">success</l-link>
    </l-col>
    <l-col>
      <l-link type="warning">warning</l-link>
    </l-col>
    <l-col>
      <l-link type="danger">danger</l-link>
    </l-col>
    <l-col>
      <l-link type="info">info</l-link>
    </l-col>
  </l-row>
</template>
<style>
</style>

```

### Link 属性
|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|type	|类型	string	|primary / success / warning / danger / info |—	| default |
|disabled	|是否为禁用状态	|boolean|	—	|false|
|icon	|图标组件样式名，详情参考[icon](/icon)	| string	|—	|—|
|href	|链接地址	|string|—	|—|