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


### 占位内容
可通过`slot = placeholder`可自定义占位内容
```vue demo
<template>
  <l-row :cols="2" labelColumn>
    <l-col label="Default">
      <l-image :src="src" />
    </l-col>
    <l-col label="Custom">
      <l-image :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </l-image>
    </l-col>
  </l-row>
</template>
<script lang="ts" setup>
const src =
  'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
</script>
```

### 加载失败
可通过`slot = error`可自定义加载失败内容
```vue demo
<template>
  <l-row :cols="2" labelColumn>
    <l-col label="Default">
      <l-image />
    </l-col>
    <l-image>
      <template #error>
        <div class="image-slot">
          <l-icon icon="l-tupian2"></l-icon>
        </div>
      </template>
    </l-image>
  </l-row>
</template>
<script lang="ts" setup>
const src =
  'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
</script>
```

### 懒加载
可通过`lazy`开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 `scroll-container `来设置滚动容器， 若未定义，则为最近一个 `overflow` 值为 `auto` 或 `scroll` 的父元素。
```vue demo
<template>
  <div class="demo-image__lazy">
    <l-image v-for="url in urls" :key="url" :src="url" lazy />
  </div>
</template>

<script lang="ts" setup>
const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
</script>

```