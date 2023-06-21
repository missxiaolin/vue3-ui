# Image 图片
图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等


### 基础用法
可通过fit确定图片如何适应到容器框，同原生 (object-fit)[https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit]。
```vue demo
<template>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <l-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
```