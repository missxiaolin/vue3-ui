# Message 消息提示

悬浮在页面角落，显示全局的通知提醒消息

## 组件用法

使用 `message` 组件来显示消息通知你可以通过message传入需要展示的内容，支持字符串和html。我们为全局注册了$message方法，完全引入eui时可以使用此全局方法。

```vue demo
<template>
  <l-button @click="openMessage">打开消息通知</l-button>
  <l-button @click="openVNode">VNode</l-button>
</template>
<script lang="ts">
  import { defineComponent, ref, h, getCurrentInstance } from 'vue'
  // import { message } from 'lui'
  export default defineComponent({
    setup() {
      let { proxy } = getCurrentInstance()
      function openMessage() {
        proxy.$message({
          message: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
        })
      }
      function openVNode() {
        proxy.$message({
          message: h('p', null, [
            h('span', { style: 'font-style: italic' }, '可以使用  '),
            h('i', { style: 'color: #29c1c2' }, 'VNode'),
          ]),
        })
      }
      function handleClickBtn() {
        console.log('click Button')
      }
      return { openMessage, openVNode } 
    }
  })
</script>
```