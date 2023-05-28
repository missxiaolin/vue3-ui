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


## 不同类型的通知

我们提供了四种不同类型的提醒框：success,warning,info和error。设置 `type` 属性以改变通知类型。

```vue demo
<template>
  <l-button @click="openMessage('success')">success</l-button>
  <l-button @click="openMessage('warning')">warning</l-button>
  <l-button @click="openMessage('info')">info</l-button>
  <l-button @click="openError('error')">error</l-button>
</template>
<script lang="ts">
import { defineComponent,getCurrentInstance, ref } from 'vue'
// import { message } from 'eui'
export default defineComponent({
  setup() {
    let { proxy } = getCurrentInstance()
    function openMessage(type) {
      proxy.$message({
        message: `this is a ${type} message`,
        type
      })
    }
    function openError() {
      proxy.$message.error('this is a error message')
    }
    return { openMessage, openError }
  },
})
</script>
```

## 手动关闭 showClose

设置 `showClose` 属性让message支持手动关闭
```vue demo
<template>
  <l-button @click="openMessage()">showClose</l-button>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance,ref } from 'vue'
// import { message } from 'eui'
export default defineComponent({
  setup() {
    let { proxy } = getCurrentInstance()
    console.log('proxy----', proxy._)
    function closeAuto() {
      console.log('Message closed')
    }
    function openMessage() {
      proxy.$message({
        message: `this is a closable message`,
        showClose: true,
        onClose: closeAuto,
      })
    }
    return { openMessage }
  },
})
</script>
```

## 控制消息通知自动关闭的时间

`duration` 属性可以用来控制通知关闭的时间。

`duration`设置为0时 通知不会自动关闭。
```vue demo
<template>
  <l-button @click="openMessage(2000)">2s后关闭的消息</l-button>
  <l-button @click="openMessage(0)">不会关闭的消息</l-button>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    function openMessage(duration) {
      proxy.$message({
        message: duration === 0 ? 'this will not close'
        : 'this will close after 2s',
        duration,
        showClose: duration === 0,
      })
    }
    return { openMessage }
  },
})
</script>
```


### Message 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| message | 内容 | string/VNode | — | — |
| dangerouslyUseHTMLString | 是否将message属性作为HTML片段处理 | boolean | — | false |
| type | 消息类型 |	string | success/info/warning/error | — |
| icon | 消息自定义图标，该属性会覆盖type的图标 | string | icon组件中的所有图标 | — |
| custom-class | 自定义类名 | string | — | — |
| duration | 显示时间，单位为毫秒。值为0时不会自动关闭 | number | — | 2500 |
| center | 文字是否居中 | boolean | — | false |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| onClose | 关闭时的回调函数 | function | — | — |
| offset | 相对屏幕顶部的偏移量。在同一时刻，所有的Notify实例应该具有一个相同的偏移量 | number | — | 0 |
| appendTo | 设置通知在DOM中的父亲元素 | string/HTMLElement | — | document.body |



### Message 事件
| 事件名 | 说明	|	回调参数 |
|---- |----- |------ |
| close | 关闭当前的通知 | — |
