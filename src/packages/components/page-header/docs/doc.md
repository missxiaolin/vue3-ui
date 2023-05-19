## PageHeader 页头

### 基础用法
```vue demo
<template>
    <div>
        <l-page-header @back="goBack" content="详情页面" title="返回">
        </l-page-header>
    </div>
    
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const goBack = () => {
        console.log('goBack')
    }
    return {
        goBack
    }
  },
};
</script>
```

### 插槽
```vue demo
<template>
    <div>
        <l-page-header @back="goBack" content="详情页面" title="标题">
          <template v-slot:breadcrumb>
            顶部
          </template>
          <template v-slot:main>
            底部
          </template>
        </l-page-header>
    </div>
    
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const goBack = () => {
        console.log('goBack')
    }
    return {
        goBack
    }
  },
};
</script>
```

### 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|title	|标题	|string	|-|	|
|title	|内容	|string	|-|	|
|icon	|图表	|string |—|	|

## 方法

| 方法名 | 参数类型 | 说明 |
| ---- | ---- | ---- |
| back | - | 点击左侧区域触发 |

### 插槽

|事件名| 说明|
| ---- | ---- |
|breadcrumb| 顶部内容|
|main| 内容|