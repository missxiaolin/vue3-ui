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

## 不同类型的通知

我们提供了四种不同类型的提醒框：success,warning,info和error。设置 `type` 属性以改变通知类型。

```vue demo
<template>
  <l-button @click="openNotification('success')">success</l-button>
  <l-button @click="openNotification('warning')">warning</l-button>
  <l-button @click="openNotification('info')">info</l-button>
  <l-button @click="openNotification('error')">error</l-button>
</template>
<script lang="ts">
import { defineComponent, ref ,getCurrentInstance} from 'vue'
// import { notify } from 'eui'
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    function openNotification(type) {
      proxy.$notify({
        message: `this is ${type} notification`,
        type
      })
    }
    return { openNotification }
  },
})
</script>
```

## 控制消息通知自动关闭的时间

`duration` 属性可以用来控制通知关闭的时间。

`duration`设置为0时 通知不会自动关闭。
```vue demo
<template>
  <l-button @click="openNotification(2000)">2s后关闭的消息</l-button>
  <l-button @click="openNotification(0)">不会关闭的消息</l-button>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    function openNotification(duration) {
      proxy.$notify({
        message: duration === 0 ? 'this will not close'
        : 'this will close after 2s',
        duration
      })
    }
    return { openNotification }
  },
})
</script>
```

## 主题 effect

`effect` 可以设定消息通知的主题，可选值为dark、light。默认为light
```vue demo
<template>
  <l-button @click="openNotification()">dark主题</l-button>
</template>
<script lang="ts">
import { defineComponent, ref,getCurrentInstance } from 'vue'
import notify from 'eui'
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    function openNotification() {
      proxy.$notify({
        message: `this is light effect notification`,
        effect: 'dark',
      })
    }
    return { openNotification }
  },
})
</script>
```
## 位置 position
Notify有四个可选的位置，分别为 `top-right` `top-left` `bottom-right` `bottom-left`，默认值为`top-right` 
```vue demo
<template>
  <l-button @click="openNotification('top-right')">top right</l-button>
  <l-button @click="openNotification('top-left')">top left</l-button>
  <l-button @click="openNotification('bottom-right')">bottom right</l-button>
  <l-button @click="openNotification('bottom-left')">bottom left</l-button>
</template>
<script lang="ts">
import { defineComponent, ref,getCurrentInstance } from 'vue'
import notify from '../src/notify.vue'
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    function openNotification(position) {
      proxy.$notify({
        message: `this is ${position} notification`,
        position
      })
    }
    return { openNotification }
  },
})
</script>
```


### Notification 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| v-model | 显示弹框 | boolean | — | false |
| title | 标题 | string |	— | — |
| message | 内容 | string/VNode | — | — |
| dangerouslyUseHTMLString | 是否将message属性作为HTML片段处理 | boolean | — | false |
| type | 消息类型 |	string | success/info/warning/error | — |
| icon | 消息自定义图标，该属性会覆盖type的图标 | string | icon组件中的所有图标 | — |
| effect | 主题 | string | dark/light | dark |
| custom-class | 自定义类名 | string | — | — |
| duration | 显示时间，单位为毫秒。值为0时不会自动关闭 | number | — | 4500 |
| position | 自定义弹出位置 | string | top-right/top-left/bottom-right/bottom-left | top-right |
| show-close | 是否显示关闭按钮 | boolean | — | true |
| on-close | 关闭时的回调函数 | function | — | — |
| offset | 相对屏幕顶部的偏移量。在同一时刻，所有的Notify实例应该具有一个相同的偏移量 | number | — | 0 |
| appendTo | 设置通知在DOM中的父亲元素 | string/HTMLElement | — | document.body |
| showBtn | 展示底部按钮 | boolean | — | false |
| onBtnClick | 点击底部按钮触发的事件 | function | — | — |



### Notification 事件
| 事件名 | 说明	|	回调参数 |
|---- |----- |------ |
| close | 关闭当前的通知 |
