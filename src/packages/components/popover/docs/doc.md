# Popover 气泡卡片
### 基础用法
与Tooltip相似，Popover也是基于`EPopper`的构建。 因此对于重复属性，请参考 `Tooltip` 的文档，在此文档中不做详尽解释。

`trigger`属性用于定义`popover`的触发方式：`hover`，`click`，`focus` 或者`manual`。


## 基础用法

```vue demo
<template>
  <l-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button>Hover to activate</l-button>
    </template>
  </l-popover>

  <l-popover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button>Click to activate</l-button>
    </template>
  </l-popover>

  <l-popover
    ref="popover"
    placement="right"
    title="Title"
    :width="200"
    trigger="focus"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button>Focus to activate</l-button>
    </template>
  </l-popover>

  <l-popover
    v-model:visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <l-button @click="visible = !visible">Manual to activate</l-button>
    </template>
  </l-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

```

### 虚拟触发
像 Tooltip一样，`Popover` 可以由虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景。通常我们使用 `#reference` 来放置我们的触发元素， 用 `triggering-element` API，您可以任意设置您的触发元素 但注意到触发元素应该是接受 `mouse` 和 `keyboard` 事件的元素。
```vue demo
<template>
<!--  v-click-outside="onClickOutside" -->
  <l-button ref="buttonRef"
    >Click me</l-button
  >

  <l-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="With title"
    virtual-triggering
  >
    <span> Some content </span>
  </l-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
// import { ClickOutside as vClickOutside } from 'eui'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>

```
### 内容可扩展
可以在 `Popover` 中嵌套其它组件， 以下为嵌套表格的例子。

利用插槽取代 `content` 属性
```vue demo
<template>
  <div style="display: flex; align-items: center">
    <l-popover placement="right" :width="400" trigger="click">
      <template #reference>
        <e-button style="margin-right: 16px">Click to activate</e-button>
      </template>
      <l-button>按钮</l-button>
    </l-popover>

  </div>
</template>

<script lang="ts" setup>
const gridData = [
  {
    date: '2016-05-02',
    name: 'Jack',
    address: 'New York City',
  },
  {
    date: '2016-05-04',
    name: 'Jack',
    address: 'New York City',
  },
  {
    date: '2016-05-01',
    name: 'Jack',
    address: 'New York City',
  },
  {
    date: '2016-05-03',
    name: 'Jack',
    address: 'New York City',
  },
]
</script>

```

### 嵌套操作
当然，你还可以嵌套操作， 它比使用dialog更加轻量
```vue demo
<template>
  <l-popover v-model:visible="visible" placement="top" :width="160">
    <p>Are you sure to delete this?</p>
    <div style="text-align: right; margin: 0">
      <l-button size="small" type="text" @click="visible = false"
        >cancel</l-button
      >
      <l-button size="small" type="primary" @click="visible = false"
        >confirm</l-button
      >
    </div>
    <template #reference>
      <l-button @click="visible = true">Delete</l-button>
    </template>
  </l-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

```


### Popover 属性
| 属性	| 说明	| 类型	| 可选值| 	默认值| 
| -----| -----| ----| -----| -----| 
| trigger	| 触发方式	| string	| click/focus/hover/manual	| click| 
| title	| 标题	| string| 	—| 	—| 
| content	| 显示的内容，也可以通过 slot 传入 DOM	| string	| —| 	—| 
| width	| 宽度| 	string / number| 	—	| 最小宽度 150px| 
| placement	| 出现位置| 	string	| top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end	| bottom| 
| disabled| 	Popover | 是否可用| 	boolean	| —	| false| 
| visible / v-model:visible	| Popover 是否显示| 	Boolean	| —	| false| 
| offset	| 出现位置的偏移量| 	number| 	—| 	0| 
| transition	| 定义渐变动画	| string	| —	| el-fade-in-linear| 
| show-arrow| 	是否显示 Tooltip 箭头， 欲了解更多信息，请参考 ElPopper 页面| 	boolean| 	—| 	true| 
| popper-options| 	[popper.js]() 的参数	| object| 	请参考 popper.js	| { boundariesElement: 'body', gpuAcceleration: false }| 
| popper-class| | 	为 popper 添加类名| 	string| 	—| 	—| 
| show-after| 	延迟出现，单位毫秒	| number| 	—	| 0| 
| hide-after| 	延迟关闭，单位毫秒	| number| 	—	| 200| 
| auto-close| 	Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏	| number| 	—| 	0| 
| tabindex| 	Popover 组件的 tabindex	| number| 	—	| —| 
### Popover 插槽
| 插槽名| 	说明| 
| ---| ----| 
| —	| Popover 内嵌 HTML 文本| 
| reference| 	触发 Popover 显示的 HTML 元素| 
### Popover 事件#
| 事件名	| 说明| 	回调参数| 
| ---| ----| ----| 
| show| 	显示时触发| 	—| 
| after-enter	| 显示动画播放完毕后触发| 	—| 
| hide| 	隐藏时触发| 	—| 
| after-leave	| 隐藏动画播放完毕后触发| 	—| 