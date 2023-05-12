## 文本省略

### 基础用法
```vue demo
<template>
    <div style="font-size: 14px;">
      <l-ellipsis 
      :content="text">
      </l-ellipsis>
    </div>
    
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    let text = ref('')
    text.value =
      `Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架(部分使用,不是全家桶)。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。vue是一款简单的mvvm（model-view-viewmodel）框架它的中心思想就是数据驱动，不像jQuery是结构驱动 结构驱动:先获取HTML的结构,然后再修改数据更新结构数据驱动:简单的理解就是直接将数据同步到结构上,视图管理抽象为数据管理，而不是管理dom结构 Vue.js 不支持 IE8及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。Vue.js 支持 所有兼容ECMAScript 5 的浏览器。`;
    return { text };
  },
};
</script>
```

### 展开/收起

```vue demo
<template>
  <div style="font-size: 14px;">
    <l-ellipsis 
    :content="text"
    expand-text="展开"
    collapse-text="收起">
    </l-ellipsis>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    let text = ref('')
    text.value =
      `Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架(部分使用,不是全家桶)。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。vue是一款简单的mvvm（model-view-viewmodel）框架它的中心思想就是数据驱动，不像jQuery是结构驱动 结构驱动:先获取HTML的结构,然后再修改数据更新结构数据驱动:简单的理解就是直接将数据同步到结构上,视图管理抽象为数据管理，而不是管理dom结构 Vue.js 不支持 IE8及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。Vue.js 支持 所有兼容ECMAScript 5 的浏览器。`;
    return { text };
  },
};
</script>
```

### 自定义行数

```vue demo
<template>
    <l-ellipsis 
    :rows="2"
    :content="text"
    expand-text="展开"
    collapse-text="收起">
    </l-ellipsis>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    let text = ref('')
    text.value =
      `Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架(部分使用,不是全家桶)。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。vue是一款简单的mvvm（model-view-viewmodel）框架它的中心思想就是数据驱动，不像jQuery是结构驱动 结构驱动:先获取HTML的结构,然后再修改数据更新结构数据驱动:简单的理解就是直接将数据同步到结构上,视图管理抽象为数据管理，而不是管理dom结构 Vue.js 不支持 IE8及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。Vue.js 支持 所有兼容ECMAScript 5 的浏览器。`;
    return { text };
  },
};
</script>
```

### 文本 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|rows	|展示的行数	|number	|1|	1|
|content	|需要展示的文本	|string	|-|	|
|expand-text	|展开操作的文案	|string|	—|	|
|collapse-text	|收起操作的文案	|string|	—|	|
|dots	|省略号的文本内容	|string|	—	||

### 文本 Events

|时间	|说明	|回调	|
|---- |----- |------ |
|click-action	|点击展开/收起时触发	|event: MouseEvent|