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


### 禁用状态
文字链接不可用状态。
```vue demo
<template>
  <l-row :cols="6">
    <l-col>
      <l-link href="" target="_blank" disabled>default</l-link>
    </l-col>
    <l-col>
      <l-link type="primary" disabled>primary</l-link>
    </l-col>
    <l-col>
      <l-link type="success" disabled>success</l-link>
    </l-col>
    <l-col>
      <l-link type="warning" disabled>warning</l-link>
    </l-col>
    <l-col>
      <l-link type="danger" disabled>danger</l-link>
    </l-col>
    <l-col>
      <l-link type="info" disabled>info</l-link>
    </l-col>
  </l-row>
</template>
```

### 文字+图标
文字+图标。
```vue demo
<template>
  <l-row :cols="6">
    <l-col>
      <l-link href="" target="_blank" icon="l-guanbi">default</l-link>
    </l-col>
    <l-col>
      <l-link href="https://www.baidu.com" target="_blank" type="primary" icon="l-loading">primary</l-link>
    </l-col>
    <l-col>
      <l-link type="success" icon="l-youbian" >success</l-link>
    </l-col>
    <l-col>
      <l-link type="warning" icon="l-sousuo">warning</l-link>
    </l-col>
    <l-col>
      <l-link type="danger" icon="l-xiazai" disabled>danger</l-link>
    </l-col>
    <l-col>
      <l-link type="info" icon="l-cuowuguanbishibai" disabled>info</l-link>
    </l-col>

  </l-row>

</template>
```

### 图标链接
有图标无文字的链接。
```vue demo
<template>
  <l-row :cols="6">
    <l-col>
      <l-link href="" target="_blank" icon="l-guanbi"></l-link>
    </l-col>
    <l-col>
      <l-link href="https:/www.baidu.com" target="_blank" type="primary" icon="l-loading"></l-link>
    </l-col>
    <l-col>
      <l-link type="success" icon="l-sousuo" ></l-link>
    </l-col>
    <l-col>
    </l-col>
    <l-col>
    </l-col>
    <l-col>
    </l-col>

  </l-row>

</template>
```

### Link 属性
|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|type	|类型	string	|primary / success / warning / danger / info |—	| default |
|disabled	|是否为禁用状态	|boolean|	—	|false|
|icon	|图标组件样式名，详情参考[icon](/icon)	| string	|—	|—|
|href	|链接地址	|string|—	|—|