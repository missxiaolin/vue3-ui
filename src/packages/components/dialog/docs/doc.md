# Dialog 按钮

在保留当前页面状态的情况下，告知用户并承载相关操作。


### 基础用法
`Dialog` 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `mode-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为两个部分：`body` 和 `footer`，`footer` 需要具名为 `footer` 的 `slot`。 `title` 属性用于定义标题，它是可选的，默认值为空。 最后，本例还展示了 `before-close` 的用法。

```vue demo
<template>
  <l-button type="text" @click="dialogVisible=true"
    >打开Dialog</l-button
  >

  <l-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <l-button @click="dialogVisible = false">Cancel</l-button>
        <l-button type="primary" @click="dialogVisible = false"
          >Confirm</l-button
        >
      </span>
    </template>
  </l-dialog>
</template>

<script lang="ts" setup>
import { ref,getCurrentInstance } from 'vue'
let { proxy } = getCurrentInstance()
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  done()
  proxy.$message({
    message: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
  })
}
</script>
```
> `before-close` 只会在用户点击关闭按钮或者对话框的遮罩区域时被调用。 如果你在 `footer` 具名插槽里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。

### 不同尺寸
`Dialog` 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `mode-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为两个部分：`body` 和 `footer`，`footer` 需要具名为 `footer` 的 `slot`。 `title` 属性用于定义标题，它是可选的，默认值为空。 最后，本例还展示了 `before-close` 的用法。

```vue demo
<template>
  <l-button type="text" @click="handleOpen('default')"
    >默认-Dialog</l-button
  >
  <l-button type="text" @click="handleOpen('mini')"
    >mini-Dialog</l-button
  >
  <l-button type="text" @click="handleOpen('small')"
    >small-Dialog</l-button
  >
  <l-button type="text" @click="handleOpen('medium')"
    >medium-Dialog</l-button
  >
  <l-button type="text" @click="handleOpen('large')"
    >large-Dialog</l-button
  >
  <l-button type="text" @click="dialogfullscreenVisible = true"
    >fullscreen-Dialog</l-button
  >

  <l-dialog
    v-model="dialogVisible"
    :title="'当前尺寸-'+dialogSize"
    :size="dialogSize"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <l-button @click="dialogVisible = false">Cancel</l-button>
        <l-button type="primary" @click="dialogVisible = false"
          >Confirm</l-button
        >
      </span>
    </template>
  </l-dialog>

  <l-dialog
    v-model="dialogfullscreenVisible"
    title="全屏"
    fullscreen
    top="60px"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <l-button @click="dialogfullscreenVisible = false">Cancel</l-button>
        <l-button type="primary" @click="dialogfullscreenVisible = false"
          >Confirm</l-button
        >
      </span>
    </template>
  </l-dialog>
</template>

<script lang="ts" setup>
import { ref,getCurrentInstance } from 'vue'
let { proxy } = getCurrentInstance()
const dialogVisible = ref(false)
const dialogfullscreenVisible = ref(false)
let dialogSize = ref('default')

const handleOpen = (size) => {
  dialogVisible.value = true
  dialogSize.value= size
}
</script>
```
### 自定义内容
对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何使用在对话框中添加表单和表格。


### 嵌套的 Dialog
如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。

通常我们不建议使用嵌套对话框。 如果你需要在页面上呈现多个对话框，你可以简单地平整它们，呈现一个平级关系。 如果你必须在另一个对话框内排出对话框，将嵌套对话框的 `append-to-body` 设置为真。 并且它将附加到正文而不是其亲节点，所以两个对话框都可以被正确渲染。

```vue demo
<template>
  <l-button type="text" @click="outerVisible = true"
    >open the outer Dialog</l-button
  >

  <l-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <l-dialog
        v-model="innerVisible"
        width="30%"
        title="Inner Dialog"
        append-to-body
      >
      </l-dialog>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <l-button @click="outerVisible = false">Cancel</l-button>
        <l-button type="primary" @click="innerVisible = true"
          >open the inner Dialog</l-button
        >
      </div>
    </template>
  </l-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>

```

### 属性
|属性	|说明	|类型	|可选值	|默认值|
|-----|----|-----|-----|----|
|model-value / v-model|	是否显示 Dialog|	boolean|	—	|—|
|title|	Dialog 对话框 Dialog 的标题， 也可通过具名 slot （见下表）传入|	string	|—	|—|
|width|	Dialog 的宽度|	string / number|	—|	50%|
|fullscreen|	是否为全屏 Dialog	|boolean|	—	|false|
|top|	Dialog CSS 中的 margin-top 值	|string	|—	|15vh|
|modal|	是否需要遮罩层|	boolean	|—|	true|
|append-to-body	|Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true|	boolean	|—|	false|
|lock-scroll|	是否在 Dialog 出现时将 body 滚动锁定|	boolean	|—	|true|
|custom-class	|Dialog 的自定义类名|	string|	—	|—|
|open-delay|	Dialog 打开的延时时间，单位毫秒|	number|	—	|0|
|close-delay|	Dialog 关闭的延时时间，单位毫秒	|number|	—|	0|
|close-on-click-modal|	是否可以通过点击 modal 关闭 Dialog|	boolean	|—|	true|
|close-on-press-escape|	是否可以通过按下 ESC 关闭 Dialog|	boolean|	—|	true|
|show-close|	是否显示关闭按钮|	boolean	|—	|true|
|before-close	|关闭前的回调，会暂停 Dialog 的关闭	|function(done)，done 用于关闭 Dialog|	—	|—|
|center|	是否对头部和底部采用居中布局|	boolean|	—	|false|
|destroy-on-close|	关闭时销毁 Dialog 中的元素|	boolean	|—	|false|


### 插槽
|插槽名|说明|
|----|-----|
| —	|Dialog 的内容|
|title	|Dialog 标题区的内容|
|footer	|Dialog 按钮操作区的内容|


### 事件
|事件名	|说明	|参数|
|----|-----|----|
|open|	Dialog 打开的回调|	—|
|opened	|Dialog 打开动画结束时的回调|	—|
|close|	Dialog 关闭的回调	|—|
|closed|	Dialog 关闭动画结束时的回调	|—|