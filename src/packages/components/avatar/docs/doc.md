
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


### 展示类型
支持使用图片，图标或者文字作为 Avatar。
```vue demo
<template>
  <l-row :cols="3">
    <e-col>
      <div class="block">
      <l-avatar icon="e-icon-follow-outline" />
      </div>
    </e-col>
    <l-col>
      <l-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </l-col>
    <l-col>
      <l-avatar>user</l-avatar>
    </l-col>
  </l-row>
</template>
```

### 加载失败的回退行为
图片加载失败时的回退行为。

```vue demo
<template>
  <l-row>
    <l-avatar :size="60" src="https://empty" @error="errorHandler">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      />
    </l-avatar>
  </l-row>
</template>

<script lang="ts">
export default {
  setup() {
    const errorHandler = () => true;
    return {
      errorHandler
    }
  }
}
</script>
```

### 适应容器
当使用图片作为用户头像时，设置该图片如何在容器中展示。

```vue demo
<template>
  <div class="avatar-demo-fit">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="title">{{ fit }}</span>
      <l-avatar shape="square" :size="100" :fit="fit" :src="url" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})

const { fits, url } = toRefs(state)
</script>

```

## API

## avatar 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| icon | 设置 Avatar 的图标类型，具体参考 Icon 组件 | string | -  | - |
| size | Avatar 大小	 | number \| `'large'` \| `'default'` \| `'small'`	 | -  | `'default'` |
| shape | Avatar 形状 | `'circle'` \| `'square'` | -  | `'circle'`	 |
| src | Avatar 图片的源地址	 | string | -  | - |
| src-set	 | 图片 Avatar 的原生 `srcset` 属性		 | string | -  | - |
| alt | 图片 Avatar 的原生 `alt` 属性		 | string | -  | - |
| fit | 当展示类型为图片的时候，设置图片如何适应容器		 | `'fill'` \| `'contain'` \| `'cover'` \| `'none'` \| `'scale-down'`	 | -  | `'cover'`	 |


## avatar 事件
|名称|	说明| 类型 |
|---|----| ---- |
| `error` | 图片加载失败时触发 | (e: Event) => void |

## avatar 插槽
|名称|	说明|
|---|----|
| `default`  | 自定义头像展示内容 | 

## avatar 事件
|事件名	|说明	|参数|
|----|----|---|