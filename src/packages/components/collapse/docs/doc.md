## collapse 折叠面板

### 基础用法
对不同段落的文本进行分割。

```vue demo
<template>
  <l-collapse v-model="activeNames" @change="handleChange">
    <l-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </l-collapse-item>
  </l-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>
```

### 自定义面板标题
除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

```vue demo
<template>
  <div class="demo-collapse">
    <l-collapse accordion>
      <l-collapse-item name="1">
        <template #title>
          Consistency
        </template>
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </l-collapse-item>
    </l-collapse>
  </div>
</template>

<script setup lang="ts">
</script>
```

### 手风琴效果
每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

```vue demo
<template>
  <div class="demo-collapse">
    <l-collapse v-model="activeName" accordion openAway @change="handleChange">
      <l-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </l-collapse-item>
    </l-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('1')

const handleChange = (value) => {
  console.log('handleChange==>', value)
}

</script>
```

### 面板标题背景
设置`background`属性可以为标题按钮添加背景色。
```vue demo
<template>
  <div class="demo-collapse">
    <l-collapse background  v-model="activeName" accordion openAway @change="handleChange">
      <l-collapse-item name="1">
        <template #title>
          Consistency
        </template>
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </l-collapse-item>
      <l-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </l-collapse-item>
    </l-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('1')

const handleChange = (value) => {
  console.log('handleChange==>', value)
}

</script>
```

### Collapse 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- | 
| model-value / v-model	| 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)	| string (accordion mode) / array (non-accordion mode)| 	—	| —| 
| accordion	| 是否手风琴模式| 	boolean	| —| 	false|
| open-away	| 是否一直打开（此属性只适用在手风琴模式）| 	boolean	| —| 	false|

### Collapse 事件

| 事件名	| 说明	| 回调参数| 
|---- |----- |------ |
| change	| 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为string，否则为array)| 	(activeNames: array (non-accordion mode) / string (accordion mode))| 

### Collapse 插槽
插槽名	Description	子标签
-	自定义默认内容	Collapse Item

### Collapse Item 属性
| 属性	| 说明	| 类型	| 可选值| 	默认值| 
|---- |----- |------ |---  |---- | 
| name	| 唯一标志符	| string/number| 	—	| —| 
| title	| 面板标题	| string	| —| 	—| 
| disabled	| 是否禁用	| boolean| 	—	| —| 

### Collapse Item 插槽
| 插槽名| 	说明| 
|---- |----- |
| —	content of Collapse Item| 
| title	| content of Collapse Item title| 