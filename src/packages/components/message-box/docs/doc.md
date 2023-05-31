# MessageBox 弹框
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
> 从设计上来说，MessageBox 的作用是美化系统自带的 alert、confirm 和 prompt，因此适合展示较为简单的内容。 如果需要弹出较为复杂的内容，请使用 Dialog。
## 消息提示
当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

调用`$alert`方法即可打开消息提示， 它模拟了系统的 `alert`，无法通过按下 `ESC` 或点击框外关闭。 此例中接收了两个参数，`message`和`title`。 值得一提的是，窗口被关闭后，它默认会返回一个`Promise`对象便于进行后续操作的处理。 若不确定浏览器是否支持`Promise`，可自行引入第三方 `polyfill` 或像本例一样使用回调进行后续处理。
```vue demo
<template>
  <l-button type="text" @click="open">Click to open the Message Box</l-button>
  <l-button type="text" @click="openDefaultTitle">Click to open Show default prompt title</l-button>
</template>

<script lang="ts" setup>
import { defineComponent, ref, h, getCurrentInstance } from 'vue'
let { proxy } = getCurrentInstance()
const open = () => {
  proxy.$alert('This is a message', '系统提示', {
    confirmButtonText: 'OK',
    callback: (action) => {
      proxy.$message({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

const openDefaultTitle = () => {
  proxy.$alert('This is a message', {
    confirmButtonText: 'OK',
    callback: (action) => {
      proxy.$message({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}
</script>

```