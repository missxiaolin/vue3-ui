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

### 不添加标题

当你不需要标题到时候, 你还可以去掉标题

```vue demo
<template>
  <l-button type="primary" style="margin-left: 16px" @click="drawer = true">
    open
  </l-button>

  <l-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </l-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      drawer: ref(false),
    }
  },
})
</script>
```

### 多层嵌套
你可以像 Dialog 一样拥有多层嵌套的 Drawer

如果你需要在不同图层中多个抽屉，你必须设置 append-to-body 属性到 true

```vue demo
<template>
  <l-button type="primary" style="margin-left: 16px" @click="drawer = true">
    open
  </l-button>

  <l-drawer v-model="drawer" title="I'm outer Drawer" size="50%">
    <div>
      <l-button @click="innerDrawer = true">Click me!</l-button>
      <l-drawer
        v-model="innerDrawer"
        title="I'm inner Drawer"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <p>_(:зゝ∠)_</p>
      </l-drawer>
    </div>
  </l-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const drawer = ref(false)
    const innerDrawer = ref(false)
    const handleClose = (done) => {
      done()
    }
    return {
      drawer,
      innerDrawer,
      handleClose,
    }
  },
})
</script>
```

## Drawer 属性

| 属性 | 说明  | 	类型 | 	可选值 | 默认值 |
| ----------| -------------| -----| ----------------- | ------- |
| model-value / v-model | 是否显示 Drawer  | boolean   | —    | false   |
| append-to-body        | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 **true**  | boolean | —                     | false   |
| lock-scroll           | 是否在 Drawer 出现时将 body 滚动锁定  | boolean  | —                     | true    |
| before-close          | 关闭前的回调，会暂停 Drawer 的关闭 | function(done)，done 用于关闭 Drawer | —                     | —       |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Drawer    | boolean | —                     | true    |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer | boolean | —                     | true    |
| open-delay            | Drawer 打开的延时时间，单位毫秒  | number  | —                     | 0       |
| close-delay           | Drawer 关闭的延时时间，单位毫秒 | number | —                     | 0       |
| custom-class          | Drawer 的自定义类名   | string    | —                     | —       |
| destroy-on-close      | 控制是否在关闭 Drawer 之后将子元素全部销毁 | boolean    | -                     | false   |
| modal                 | 是否需要遮罩层 | boolean | —                     | true    |
| direction             | Drawer 打开的方向 | Direction  | rtl / ltr / ttb / btt | rtl     |
| show-close            | 是否显示关闭按钮 | boolean  | —                     | true    |
| size                  | Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释 | number / string       | -                     | '30%'   |
| title                 | Drawer 的标题，也可通过具名 slot （见下表）传入 | string     | —                     | —       |
| withHeader            | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效  | boolean  | -                     | true    |
| modal-class           | 遮罩层的自定义类名 layer  | string  | -                     | -       |
| z-index               | 设置 z-index  | number    | -                     | -       |
| offset               | Drawer 打开方向的偏移量  | number / string   | -                     | 0     |

## Drawer 插槽

| 插槽名  | 说明          |
| ----- | -------------------- |
| —     | Drawer 的内容     |
| title | Drawer 标题区的内容 |

## Drawer 方法

| 名称        | 说明                                                     |
| ----------- | --------------------------------------------------------------- |
| handleClose | 用于关闭 Drawer, 该方法会调用传入的 `before-close` 方法 |

## Drawer 事件

| 事件名称   | 说明 | 参数 |
| -------   | ----- | ---- |
| open | Drawer 打开的回调 | — |
| opened | Drawer 打开动画时的回调 | — |
| close | Drawer 关闭的回调 | — |
| closed | Drawer 关闭动画结束时的回调 | — |
