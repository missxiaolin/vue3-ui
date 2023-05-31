# Drawer 抽屉

有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验.

> 在 Vue 3 之后的版本 v-model 可以用于任何一个组件，visible.sync 已被移除，请使用 v-model="visibilityBinding" 来控制抽屉组件的显示和隐藏状态。

### 基础用法

呼出一个临时的侧边栏，支持上下左右四个方向。

你必须像 Dialog一样为 Drawer 设置 model-value 来控制 Drawer 的显示与隐藏状态，该属性接受一个 boolean 类型。 Drawer 包含两部分内容：title 和 body，其中title是一个具名插槽，你既可以通过设置 title 属性来改变 title 的内容，也可以给 Drawer 传入一个具名的插槽 title 来改变内容，该属性默认为一个空的字符串；body 部分是 Drawer 的主要部分，包含了用户自定义的内容，该部分内容可以通过默认插槽来进行控制，详见页面底部插槽部分。 当 Drawer 打开时，默认设置是从右至左打开 30% 浏览器宽度。 你可以通过传入对应的 direction 和 size 属性来修改这一默认行为。 下面一个示例将展示如何使用 before-close API，更多详细用法请参考页面底部的 API 部分。

```vue demo
<template>
  <l-button type="primary" style="margin-left: 16px" @click="drawer = true">
    open
  </l-button>

  <l-drawer
    ref="drawerRef"
    v-model="drawer"
    :modal="true"
    title="我的收藏"
    direction="ltr"
    :before-close="handleClose"
    :offset="0"
    :append-to-body="false"
    :lock-scroll="false"
    :close-on-click-modal="true"
    modal-class="thisisceshimodalclass"
    :show-close="true"
    size="35%"
    :with-header="true"
    :z-index="2000"
    @open="handleOpenEvent"
    @opened="handleOpenedEvent"
    @close="handleCloseEvent"
    @closed="handleClosedEvent"
  >
    <span>Hi, there!</span>
    <l-button type="primary" style="margin-left: 16px" @click="drawer = false">
      close
    </l-button>
  </l-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const drawerRef = ref(null)
    const drawer = ref(false)
    const direction = ref('rtl')
    const handleClose = (done) => {
      done()
    }
    const handleOpen = (done) => {
      console.log('handleOpen===>', done)
    }
    const handleOpenEvent = (e) => {
      console.log('handleOpenEvent==>', e)
    }
    const handleOpenedEvent = (e) => {
      console.log('handleOpenedEvent==>', e)
    }
    const handleCloseEvent = (e) => {
      console.log('handleCloseEvent==>', e)
    }
    const handleClosedEvent = (e) => {
      console.log('handleClosedEvent==>', e)
    }

    onMounted(() => {
      // console.log('onMounted=>>', drawerRef.value.handleClose)
      // console.log('drawerRef==>', getCurrentInstance().ctx.$refs.drawerRef.handleClose)
      // drawerRef.value.handleClose()
      // getCurrentInstance().ctx.$refs.drawerRef.handleClose()
    })

    return {
      drawer,
      direction,
      handleClose,
      handleOpen,
      handleOpenEvent,
      handleOpenedEvent,
      handleCloseEvent,
      handleClosedEvent,
      drawerRef
    }
  },
})
</script>
```