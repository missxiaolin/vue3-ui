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