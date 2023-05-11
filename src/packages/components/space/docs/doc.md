# space 组件

### 介绍

给组件之间提供统一的间距


### 基础用法
通过间距组件来给多个组件之间提供间距,默认8px
```vue demo
<template>
  <l-space>
    <l-button type="primary">Primary</l-button>
    <l-button type="success">Success</l-button>
    <l-button type="info">Info</l-button>
    <l-button type="warning">Warning</l-button>
    <l-button type="danger">Danger</l-button>
    <l-button type="gary">gary</l-button>
  </l-space>
</template>
```

### 垂直布局
使用 direction 来控制布局的方式, 背后实际上是利用了 flex-direction 来控制.
```vue demo 
<template>
  <l-space direction="vertical">
    <l-button type="primary">Primary</l-button>
    <l-button type="success">Success</l-button>
  </l-space>
</template>

```

### 环绕间距
环绕的间距，四周都有间距，一般用户会换行的场景
在水平 (horizontal) 模式下, 通过控制 wrap (布尔类型) **来控制是否自动换行
```vue demo 
<template>
  <l-row :cols="5">
    <l-col>
      <l-space wrap>
        <l-button type="primary">Primary</l-button>
        <l-button type="success">Success</l-button>
        <l-button type="info">Info</l-button>
        <l-button type="warning">Warning</l-button>
        <l-button type="danger">Danger</l-button>
      </l-space>
    </l-col>
    <l-col>
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

### 控制间距的大小
通过调整 size 的值来控制间距的大小, size可选值为 small, 默认, large, 这些大小对应于 4px, 8px, 12px, 16px. 默认的间距大小为 8px。
```vue demo 
<template>
  <l-space direction="vertical" alignment="start" :size="30">
    <l-space wrap :size="size">
      <l-button type="primary" v-for="i in 3" :key="i">button{{ i+1 }}</l-button>
    </l-space>
  </l-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const size = ref('default')
</script>
```

### 自定义 间距大小
通过size传入自己定义的间隔数值 (数字类型)来设置 间距大小
```vue demo
<template>
  <l-slider v-model="size" />
  <l-space wrap :size="size">
    <l-button type="primary" v-for="i in 3" :key="i">button{{ i+1 }}</l-button>
  </l-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const size = ref(20)
</script>
```


### 行间分隔符
通过设置spacer在间距中间加入分隔符号
```vue demo
<template>
  <l-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <l-button type="primary"> button {{ i }} </l-button>
    </div>
  </l-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const size = ref(10)
</script>
```


## API

## space 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| alignment | 对齐的方式	 | string	 | align-items(见对齐方式中链接)  | 'center' |
| class | 类名		 | string/ Array<Object , String> / Object	 | - | - |
| direction | 排列的方向 | string	 | vertical/horizontal | horizontal |
| prefix-cls	 | 给 space-items 的类名前缀 | string	 | 	l-space | - |
| style | 额外样式	 | string / Array<Object , String> / Object	 | 	- | - |
| spacer | 间隔符 | string / number / VNode |	- | - |
| size | 间隔大小	 | string / number / [number, number] |	- | 'small' |
| wrap | 设置是否自动折行		 | boolean | true / false | false |
| fill | 子元素是否填充父容器		 | boolean | true / false | false |
| fill-ratio	 | 填充父容器的比例		 | number |	- | 100 |







## space 插槽
|名称|	说明|
|---|----|
| default | 需要添加间隔的元素 | 

