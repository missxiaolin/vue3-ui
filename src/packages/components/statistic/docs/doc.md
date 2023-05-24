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