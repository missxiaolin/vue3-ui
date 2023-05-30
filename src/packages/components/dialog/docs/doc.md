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