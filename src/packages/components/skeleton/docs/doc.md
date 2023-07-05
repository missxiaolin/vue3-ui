
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


### 配置段落数量
配置骨架屏段落数量，以便更接近真实渲染效果。显示的数量会比传入的数量多 1，首行会被渲染一个长度 33% 的段首。
```vue demo
<template>
<l-skeleton :rows="5" />
</template>
```

### 动画效果
通过animated属性开启加载动画，所有骨架屏子节点将显示动画
```vue demo
<template>
  <l-skeleton :rows="5" animated />
</template>
```

### 自定义样式
EUI默认的排版模式有时不符合需求，此时可以通过一个具名slot "template" 来自己设定模版<br />
我们提供了不同的模板单元可供使用，具体可选值请看 API 详细描述<br />
在构建您自己自定义的骨架时，您应该尽可能更接近于真正的DOM。 避免DOM因高度差而发生抖动。
```vue demo
<template>
  <l-skeleton style="width: 300px;">
    <template #template>
      <l-skeleton-item variant="image" style="width: 200px; height: 200px" />
      <div style="padding: 15px">
        <l-skeleton-item variant="p" style="width: 50%;" />
        <div 
          style="display: flex;
          align-items: center;
          justify-items: space-between;">
            <l-skeleton-item variant="text" style="margin-right: 20px;" />
            <l-skeleton-item variant="text" style="width: 30%;" />
        </div>
      </div>
    </template>
  </l-skeleton>
</template>
```

### 加载状态
当 Loading 结束之后，我们往往需要显示真实的 UI， 可以通过 loading 的值来控制是否显示加载后的 DOM。 然后通过 具名 Slot default 来设置当 loading 结束之后需要展示的 UI。
```vue demo
<template>
  <l-space direction="vertical" alignment="flex-start">
    <div>
      <label style="margin-right: 16px">Switch Loading</label>
      <l-switch v-model="loading" />
    </div>
    <l-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <l-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <l-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <l-skeleton-item variant="text" style="margin-right: 16px" />
            <l-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <l-panel title="panel title" border>
          <image style="width: 100px; height: 100px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <l-button text class="button">Operation button</l-button>
            </div>
          </div>
        </l-panel>
      </template>
    </l-skeleton>
  </l-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
const currentDate = new Date().toDateString()
</script>
```

### 渲染多条数据
大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。 利用 count 这个属性就能控制渲染多少条假的数据在页面上<br />
TIP: 尽可能的将 count 的大小保持在最小状态, 即使是假的 UI, DOM 元素多了之后, 照样会引起性能问题
```vue demo
<template>
  <l-space direction="vertical" alignment="flex-start">
    <l-button type="primary" @click="setLoading">Click me to reload</l-button>
    <l-skeleton style="width: 240px" :loading="loading" animated :count="3">
      <template #template>
        <l-skeleton-item variant="image" style="width: 400px; height: 267px" />
        <div style="padding: 14px">
          <l-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <l-skeleton-item variant="text" style="margin-right: 16px" />
            <l-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <l-panel
          style="width: 30%;"
          v-for="item in lists"
          :key="item.name"
          :body-style="{ padding: '0px', marginBottom: '1px' }"
          border>
          <image style="width: 100%;display: block;" :src="item.imgUrl" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
            </div>
          </div>
        </l-panel>
      </template>
    </l-skeleton>
  </l-space>
</template>
<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

interface ListItem {
  imgUrl: string,
  name: string
}
export default defineComponent({
  setup(props) {
    const loading = ref(true)
    const lists = ref<ListItem[]>([])
    const currentDate = new Date().toDateString()

    const setLoading = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }
    onMounted (() => {
      loading.value = false
      lists.value = [
        {
          imgUrl:
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          name: 'Deer',
        },
        {
          imgUrl:
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          name: 'Horse',
        },
        {
          imgUrl:
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          name: 'Mountain Lion',
        },
      ]
    })

    return {
      loading,
      lists,
      currentDate,
      setLoading
    }
  }
})
</script>
```

### 防止渲染抖动
有时网络请求回来时，真实的数据就已经回来了，骨架占位刚开始渲染，会造成界面闪烁，为了避免出现这种情况可以通过throttle属性避免这个问题。
```vue demo 
<template>
  <l-space direction="vertical" alignment="flex-start">
    <div>
      <label style="margin-right: 16px">Switch Loading</label>
      <l-switch v-model="loading" />
    </div>
    <l-skeleton
      style="width: 240px"
      :loading="loading"
      animated
      :throttle="500"
    >
      <template #template>
        <l-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <l-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <l-skeleton-item variant="text" style="margin-right: 16px" />
            <l-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <l-panel border>
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
          </div>
        </l-panel>
      </template>
    </l-skeleton>
  </l-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const currentDate = new Date().toDateString()
</script>
```


## API

## skeleton 属性

|属性	|说明	|类型	|默认值|
|---- |----- |------ |---- |
| animated | 是否使用动画 | boolean	 | false |
| count | 渲染多少个 template, 建议使用尽可能小的数字 | number | 1 |
| loading | 是否显示加载结束后的 DOM 结构 | boolean	 | false |
| rows | 骨架屏段落数量 | number | 3 |
| throttle | 延迟占位 DOM 渲染的时间, 单位是毫秒 | number | 0 |




## skeleton 插槽
|名称 |说明 |作用域 | 
|---|----|---- |
| default  | 正在渲染的DOM | $attrs |
| template | 自定义渲染 skeleton 模板 | { key: number } |


## skeleton Item 属性
|属性	|说明	|类型	|默认值|
|---- |----- |------ |---- |
| variant | 当前渲染 skeleton 类型 | 'p' 、'text' 、 'h1' 、 'h3' 、 'text' 、 'caption' 、 'button' 、 'image' 、 'circle' 、 'rect' | 'text' |