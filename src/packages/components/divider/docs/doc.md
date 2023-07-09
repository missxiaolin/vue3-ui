### 基础用法
对不同段落的文本进行分割。

```vue demo
<template>
  <div>
    <span>I sit at my window this morning where the world like a passer-by stops
      for a moment, nods to me and goes.</span>
    <l-divider direction="horizontal" />
    <span>There little thoughts are the rustle of leaves; they have their whisper
      of joy in my mind.</span>
  </div>
</template>
```

```vue demo
<template>
  <div>
    <l-divider>标题</l-divider>
  </div>
</template>
```


## Divider 属性

| 属性       | 说明    | 类型   | 可选值  | 	默认值    |
| --------- | ------ | ----- | ----- | ---------- |
| direction | 设置分割线方向  | string | horizontal / vertical | horizontal |
| border-style  | 设置分隔符样式 | string | [CSS/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid      |
| content-position | 设置分割线文案的位置 | String | left / right / center   | center |