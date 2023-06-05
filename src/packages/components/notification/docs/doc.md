# Notification 消息通知

悬浮在页面角落，显示全局的通知提醒消息

## 组件用法

使用 `notify` 组件来显示消息通知你可以通过message传入需要展示的内容，支持字符串和html。我们为全局注册了$notify方法，完全引入eui时可以使用此全局方法。

```vue demo
<template>
  <l-button @click="openNotification">打开消息通知</l-button>
</template>
<script lang="ts">
  import { defineComponent, ref ,getCurrentInstance} from 'vue'
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance()
      function openNotification() {
        proxy.$notify({
          title: '来了一条新消息，这是标题',
          message: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
          type: 'info',
          showBtn: true,
          onBtnClick: handleClickBtn
        })
      }
      function handleClickBtn() {
        console.log('click Button')
      }
      return { openNotification } 
    }
  })
</script>
```