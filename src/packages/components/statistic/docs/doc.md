## Statistic 数据统计
将信息聚合在卡片容器中展示。

### 基础用法

```vue demo
<template>
  <l-statistic label="总收益" value="11,111,111"></l-statistic>
  <l-statistic label="门店收益" :value="111"></l-statistic>
  <l-statistic label="订单收益">
      111,111
  </l-statistic>
</template>
```


### 基础用法

```vue demo
<template>
  <l-statistic label="总收益" top>
      11,111,111
  </l-statistic>
  <l-statistic label="门店收益" top>
      1,111
  </l-statistic>
</template>
```

### 字体大小及样式
使用`size`、`italic` 设置字体大小及是否倾斜
```vue demo
<template>
  <l-statistic label="我变大了" top size="30">
      111,111
  </l-statistic>
  <l-statistic label="我不倾斜" top :italic="false">
      111,111
  </l-statistic>
</template>
```
### 分割线

```vue demo
<template>
  <l-statistic label="总收益" value="11,111,111"></l-statistic>
  <l-statistic label="门店收益" :value="111"></l-statistic>
  <l-statistic label="订单收益">
      111,111
  </l-statistic>
</template>
```


### 标题 slot

```vue demo
<template>
  <l-statistic top>
    <template #label>自定义标题</template>
      111,111
  </l-statistic>
</template>
```


### 属性
 | 属性	 | 说明	 | 类型	 | 可选值	 | 默认值 | 
 | ---- | ----- |------ |---  |---- |
 | label	 | 统计的标题 你既可以通过设置 label 来修改标题，也可以通过 slot#label 传入 DOM 节点	 | string | 	— | 	— | 
 | value	 | 统计数据的值 | string / numbber	 | -	 |  - |
 | size	 | 统计的标题展示位置 | number	 | -	 |  20 |
 | italic	 | 统计的标题展示位置 | boolean	 | -	 |  false |