
# avatar 组件
Avatar 组件可以用来代表人物或对象， 支持使用图片，图标或者文字作为 Avatar


### 基础用法
使用 shape 和 size 属性来设置 Avatar 的形状和大小。

```vue demo
<template>
  <l-row :cols="2" class="demo-avatar demo-basic">
    <l-col>
      <div class="demo-avatar-wrapper">
        <div class="sub-title">circle</div>
        <div class="demo-basic--circle">
          <div class="block">
            <l-avatar :size="50" :src="circleUrl" />
          </div>
          <div v-for="size in sizeList" :key="size" class="block">
            <l-avatar :size="size" :src="circleUrl" />
          </div>
        </div>
      </div>
    </l-col>
    <l-col>
      <div class="demo-avatar-wrapper">
        <div class="sub-title">square</div>
        <div class="demo-basic--square">
          <div class="block">
            <l-avatar shape="square" :size="50" :src="squareUrl" />
          </div>
          <div v-for="size in sizeList" :key="size" class="block">
            <l-avatar shape="square" :size="size" :src="squareUrl" />
          </div>
        </div>
      </div>
    </l-col>
  </l-row>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl, squareUrl, sizeList } = toRefs(state)
</script>

```