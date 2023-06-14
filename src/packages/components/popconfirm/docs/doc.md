# Popconfirm 气泡确认框
点击某个元素弹出一个简单的气泡确认框

### 基础用法
`Popconfirm` 的属性与 `Popover` 很类似， 因此对于重复属性，请参考 `Popover` 的文档，在此文档中不做详尽解释。

在 `Popconfirm` 中，只有 `title` 属性可用，`content` 属性不会被展示。

```vue demo
<template>
  <l-popconfirm title="Are you sure to delete this?">
    <template #reference>
      <l-button>Delete</l-button>
    </template>
  </l-popconfirm>
</template>
```

### 自定义弹出框的内容
可以在 `Popconfirm` 中自定义内容。
```vue demo
<template>
  <l-popconfirm
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    icon="e-icon-mark-fill"
    icon-color="red"
    title="Are you sure to delete this?"
  >
    <template #reference>
      <l-button>Delete</l-button>
    </template>
  </l-popconfirm>
</template>

<script setup lang="ts">
</script>

```
### 多种让 Popconfirm 出现的方法
点击按钮触发事件
```vue demo
<template>
  <l-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    icon="e-icon-mark-fill"
    icon-color="red"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <l-button>Delete</l-button>
    </template>
  </l-popconfirm>
</template>

<script setup lang="ts">
const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>


```



### Popover 属性
| 属性	| 说明	| 类型	| 可选值| 	默认值| 
| -----| -----| ----| -----| -----| 
| title| 	标题| 	String| 	—	| —| 
| confirmButtonText	| 确认按钮文字	| String| 	—| 	—| 
| cancelButtonText	| 取消按钮文字| 	String| 	—	| —| 
| confirmButtonType	| 确认按钮类型	| String	| —	| Primary| 
| cancelButtonType| 	取消按钮类型	| String	| —	| Text| 
| icon| 	自定义图标| 	String / Component| 	—| 	QuestionFilled| 
| icon-color| 	Icon 颜色	String| 	—	| #f90| 
| hide-icon	| 是否隐藏 | Icon	Boolean	| —	| false| 
| teleported	| whether popconfirm is teleported to the body| 	boolean	| true / false	| true| 
| persistent| 	when popconfirm inactive and persistent is false , popconfirm will be destroyed	| boolean| 	—	| false| 
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