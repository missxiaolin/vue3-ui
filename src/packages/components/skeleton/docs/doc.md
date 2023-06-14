
# skeleton 组件

### 介绍

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。


### 基础用法
基础的骨架效果。默认骨架屏段落数量为3
```vue demo
<template>
  <l-skeleton />
  <br />
  <l-skeleton style="--l-skeleton-circle-size: 100px">
    <template #template>
      <l-skeleton-item variant="circle" />
    </template>
  </l-skeleton>
</template>
```