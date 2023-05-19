# loading-bar 组件

>如果你想使用加载条，你需要把调用其方法的组件放在 `loadingbar` 组件内部并注入 `loadingbar`

例：在App.vue里最外面包一层l-loading-bar组件
``` html
  <l-loading-bar :loading-bar-style="{ loading: {}, error: {} }"" to="html">
    <router-view></router-view>
  </l-loading-bar>
```

### 基础用法
```vue demo
<template>
  <l-space>
    <l-button @click="handleStart">
      开始
    </l-button>
    <l-button :disabled="disabled" @click="handleFinish">
      结束
    </l-button>
    <l-button @click="handleError">
      报个错
    </l-button>
  </l-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLoadingBar } from '../index.ts'

export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    const disabledRef = ref(true)
    return {
      disabled: disabledRef,
      handleStart () {
        loadingBar.start()
        disabledRef.value = false
      },
      handleFinish () {
        loadingBar.finish()
        disabledRef.value = true
      },
      handleError () {
        disabledRef.value = true
        loadingBar.error()
      }
    }
  }
})
</script>
```


## loading-bar 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| loading-bar-style | 加载条样式 | string / object | -  | undefined |
| to | 挂载节点 | Object | -  | body |

## loading-bar 事件
|事件名	|说明	|参数|
|--- | ---- | ---- |
|error|加载条显示错误|---|
|finish|加载条结束|---|
|start|加载条开始|---|
