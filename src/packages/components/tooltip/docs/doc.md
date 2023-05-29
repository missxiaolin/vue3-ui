# Tooltip 文字提示
常用于展示鼠标 hover 时的提示信息。

## 基础用法
在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 content 属性来决定 hover 时的提示信息。 由 placement 属性决定展示效果： placement属性值为：[方向]-[对齐位置]；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。 如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。
```vue demo
<template>
  <div class="tooltip-base-box">
    <l-row :cols="5">
    <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <l-button>top-start</l-button>
      </l-tooltip>
      </l-col>
      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <l-button>top</l-button>
      </l-tooltip>
      </l-col>
      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <l-button>top-end</l-button>
      </l-tooltip>
      </l-col>
    </l-row>

     <l-row :cols="5">
    <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <l-button>left-start</l-button>
      </l-tooltip>
      </l-col>
      <l-col />

      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <l-button>right-start</l-button>
      </l-tooltip>
    </l-col>
    </l-row>

    <l-row :cols="5">
    <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <l-button class="mt-3 mb-3">left</l-button>
      </l-tooltip>
      </l-col>
      <l-col />

      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <l-button>right</l-button>
      </l-tooltip>
    </l-col>
    </l-row>

    <l-row :cols="5">
    <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <l-button>left-end</l-button>
      </l-tooltip>
      </l-col>
      <l-col />
      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <l-button>right-end</l-button>
      </l-tooltip>
    </l-col>
    </l-row>

     <l-row :cols="5">
    <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <l-button>bottom-start</l-button>
      </l-tooltip>
      </l-col>
      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <l-button>bottom</l-button>
      </l-tooltip>
      </l-col>
      <l-col>
      <l-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <l-button>bottom-end</l-button>
      </l-tooltip>
    </l-col>
    </l-row>
  </div>
</template>

```

### 主题
Tooltip 组件提供了两个不同的主题：dark和light。
> 要使用自定义主题，您必须知道您的工具提示在哪里渲染， 如果您的工具提示被呈现为根元素，您将需要全局设置css规则。
建议您使用自定义主题并同时显示箭头时不使用线性渐变背景颜色。 因为弹出箭头和内容是两个不同的元素， 弹出箭头的样式需要单独设置， 当它到渐变背景颜色时，会看起来很奇怪。

通过设置 `effect` 来修改主题，默认值为 `dark`.
```vue demo
<template>
  <l-tooltip content="Top center" placement="top">
    <l-button>Dark</l-button>
  </l-tooltip>
  <l-tooltip content="Bottom center" placement="bottom" effect="light">
    <l-button>Light</l-button>
  </l-tooltip>

  <l-tooltip content="Bottom center" effect="customized">
    <l-button>Customized theme</l-button>
  </l-tooltip>
</template>

```

### 更多内容的文字提示
展示多行文本或者是设置文本内容的格式

用具名 slot `content`，替代`tooltip`中的`content`属性。
```vue demo
<template>
  <l-tooltip placement="top">
    <template #content> multiple lines<br />second line </template>
    <l-button>Top center</l-button>
  </l-tooltip>
</template>
``` 

### 显示 HTML 内容
内容属性可以设置为 `HTML` 字符串。
> `content` 属性虽然支持传入 `HTML` 片段，但是在网站上动态渲染任意 `HTML` 是非常危险的，因为容易导致 XSS 攻击。 因此在 `raw-content` 打开的情况下，请确保 `content` 的内容是可信的，永远不要将用户提交的内容赋值给 `content` 属性。
```vue demo
<template>
  <l-tooltip
    content="<span>The content can be <strong>HTML</strong></span>"
    raw-content
  >
    <l-button>hover me</l-button>
  </l-tooltip>
</template>
```

### 单例模式
Tooltip 可以作为单例，也就是是说你可以同时有多个触发同一个 `tooltip` 的触发元素，这个功能是在 虚拟触发 的基础上开发的。
> 已知问题：当使用单例模式时，tooltip 的触发元素发生改变的时候可能会发生弹跳。
```vue demo
<template>
  <div>
    <l-button
      v-for="i in 3"
      :key="i"
      @mouseover="(e) => (buttonRef = e.currentTarget)"
      @click="visible = !visible"
      >Click to open tooltip</l-button
    >
  </div>

  <l-tooltip
    ref="tooltipRef"
    v-model:visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false,
          },
        },
      ],
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    trigger="click"
    popper-class="singleton-tooltip"
  >
    <template #content>
      <span> Some content </span>
    </template>
  </l-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const buttonRef = ref()
const tooltipRef = ref()

const visible = ref(false)
</script>

```
### 受控模式
Tooltip 可以通过父组件使用 `v-model:visible` 来控制它的显示与关闭。
```vue demo
<template>
  <l-tooltip v-model:visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <l-button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </l-button>
  </l-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```
## 属性

| 属性    | 说明      | 类型    | 可选值     | 默认值         |
| ----   | --------- | ------ | --------- | ------------  |
| append-to | 指示 Tooltip 的内容将附加在哪一个网页元素上  | CSSSeector \ HTMLeement | —  | #e-popper-container-[randomValue] |
| append-to-body (deprecated)   | Tooltip 的内容是否附加在 document.body 元素上   boolean | true / false     ｜true  |
| effect | Tooltip 主题，Element Plus 内置了 dark / light 两种主题  | string  | string  | dark |
| content | display content, can be overridden by `slot#content`                                                                                                         | String                     | —                                                                                                         | —                                                       |
| raw-content                              | whether `content` is treated as HTML string                                                                                                                  | boolean                    | —                                                                                                         | false                                                   |
| placement                                | position of Tooltip                                                                                                                                          | string                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| visible / v-mode:visible                | visibility of Tooltip                                                                                                                                        | boolean                    | —                                                                                                         | false                                                   |
| disabled                                 | whether Tooltip is disabled                                                                                                                                  | boolean                    | —                                                                                                         | false                                                   |
| offset                                   | offset of the Tooltip                                                                                                                                        | number                     | —                                                                                                         | 0                                                       |
| transition                               | animation name                                                                                                                                               | string                     | —                                                                                                         | e-fade-in-linear                                       |
| visible-arrow (will deprecate in 2.1.0 ) | whether an arrow is displayed. For more information, check [EPopper](https://eui.qa.enmonster.com/popper) page | boolean                    | —                                                                                                         | true                                                    |
| popper-options                           | [popper.js](https://popper.js.org/documentation.html) parameters                                                                                             | Object                     | refer to [popper.js](https://popper.js.org/documentation.html) doc                                        | `{ boundarieseement: 'body', gpuAcceeration: false }` |
| show-after                               | deay of appearance, in millisecond                                                                                                                          | number                     | —                                                                                                         | 0                                                       |
| show-arrow                               | whether the tooltip content has an arrow                                                                                                                     | boolean                    | true / false                                                                                              | true                                                    |
| hide-after                               | deay of disappear, in millisecond                                                                                                                           | number                     | —                                                                                                         | 0                                                       |
| auto-close                               | timeout in milliseconds to hide tooltip                                                                                                                      | number                     | —                                                                                                         | 0                                                       |
| manual                                   | whether to control Tooltip manually. `mouseenter` and `mouseeave` won't have effects if set to `true`                                                       | boolean                    | —                                                                                                         | false                                                   |
| popper-class                             | custom class name for Tooltip's popper                                                                                                                       | string                     | —                                                                                                         | —                                                       |
| enterable                                | whether the mouse can enter the tooltip                                                                                                                      | Boolean                    | —                                                                                                         | true                                                    |
| tabindex                                 | [tabindex](https://deveoper.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Tooltip                                                          | number                     | —                                                                                                         | 0                                                       |
| teeported                               | whether tooltip content is teeported, if `true` it will be teeported to where `append-to` sets                                                             | boolean                    | true / false                                                                                              | true                                                    |
| trigger                                  | How should the tooltip be triggered (to show)                                                                                                                | string                     | hover / click / focus / contextmenu                                                                       | hover                                                   |
| virtual-triggering                       | Indicates whether virtual triggering is enabled                                                                                                              | boolean                    | —                                                                                                         | false                                                   |
| virtual-ref                              | Indicates the reference eement to which the tooltip is attached                                                                                             | HTMLeement                | —                                                                                                         | —                                                       |

## Slots

| 名字     | 描述                            |
| ------- | -------------------------------------- |
| —       | Tooltip triggering & reference eement |
| content | customize content                      |