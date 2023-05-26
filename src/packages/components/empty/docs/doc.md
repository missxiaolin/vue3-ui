# empty 组件

### 介绍

空状态时的占位提示。


### 基础用法
```vue demo
<template>
  <l-empty />
</template>
```

### 自定义图片
通过设置 `image` 属性传入图片 URL。
```vue demo
<template>
  <l-empty image="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
</template>
```

### 图片尺寸
通过设置 `image-size` 属性来控制图片尺寸。
```vue demo
<template>
  <l-empty :image-size="300" />
</template>
```

### 描述信息
通过设置 `description` 或者通过 `description` 插槽来插入空状态描述信息。
```vue demo
<template>
  <l-empty>
    <template #description>
      <div style="color: #ccc;">暂无数据~</div>
    </template>
  </l-empty>
</template>
```

### 底部内容
使用默认插槽可在底部插入内容。
```vue demo
<template>
  <l-empty>
    <l-button>底部按钮</l-button>
  </l-empty>
</template>
```

### 预制空状态
同样支持`empty`的属性。
```vue demo
<template>
  <l-row :cols="3">
    <l-col :key="item" v-for="item in modes">
      <div class="empty-status-demo">
        <p>{{item}}</p>
        <l-empty :mode="item">
        </l-empty>
      </div>
    </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const modes = ref(['default', 'pending', 'launched', 'approval', 'favorite', 'chapter'])
</script>
```

## API

## empty 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| image | 图片地址 | string | -  | - |
| image-size | 图片大小（宽度） | number | -  | - |
| description | 描述信息 | string | -  | - |


## empty 插槽
|名称|	说明|
|---|----|
| default  | 自定义底部内容 | 
| image  | 自定义图片 | 
| description  | 自定义描述信息 | 


### empty-status 属性
|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| mode | 类型 | `default`\|`lanuched`\|`pending`\|`approval`\|`favorite` | -  | `default` |