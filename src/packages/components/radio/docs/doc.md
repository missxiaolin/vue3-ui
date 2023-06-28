# Radio 单选框

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。

要使用 `Radio` 组件，只需要设置`v-model`绑定变量， 选中意味着变量的值为相应 `Radio` `label`属性的值， label可以是`String`、`Number` 或 `Boolean`。

```vue demo
<template>
    <div>
        <l-radio v-model="radio" name="A" label="1">选项 A</l-radio>
        <l-radio v-model="radio" name="A" label="2">选项 B</l-radio>
        <l-radio v-model="radio" name="A" label="3">选项 C</l-radio>
        <l-radio v-model="radio" name="A" label="4">选项 D</l-radio>
    </div>
</template>
<script lang="ts">
    import { defineComponent, watch, ref } from 'vue'
    export default defineComponent({
        setup() {
            const radio = ref('1');
            watch(radio,(newVal,oldVal)=>{
                console.log('新的值=》',newVal,'老的值=》',oldVal)
            })
            return{radio} 
        }
    })  
</script>
```

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态.

你只需要为单选框设置 `disabled` 属性就能控制其禁用状态。
```vue demo
<template>
  <l-radio v-model="radio" disabled label="A">选项 A</l-radio>
  <l-radio v-model="radio" disabled label="B">选项 B</l-radio>
  <l-radio v-model="radio" label="C">选项 C</l-radio>
  <l-radio v-model="radio" label="D">选项 D</l-radio>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      radio: ref('A'),
    }
  },
})
</script>
```

## change 事件

`change` 属性可以用来获取选中值
```vue demo
<template>
  <l-radio v-model="radio" @change="modelChange" label="A">选项 A</l-radio>
  <l-radio v-model="radio" label="B">选项 B</l-radio>
  <l-radio v-model="radio" label="C">选项 C</l-radio>
  <l-radio v-model="radio" label="D">选项 D</l-radio>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('A');
    const modelChange = (val) => {
        console.log("val==>",val)
    }
    return {radio,modelChange}
  },
})
</script>
```

## 单选框组
适用于在多个互斥的选项中选择的场景

`l-radio-group`和`e-radio`组合实现单选组， 为 `l-radio-group` 绑定v-model，再为 每一个 `l-radio` 设置好 `label` 属性即可。
```vue demo
<template>
  <div>
    <l-radio-group v-model="group">
      <l-radio label="A">选项 A</l-radio>
      <l-radio label="B">选项 B</l-radio>
      <l-radio label="C">选项 C</l-radio>
      <l-radio label="D">选项 D</l-radio>
    </l-radio-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const group = ref('A');
    return {group}
  },
})
</script>
```

## 竖向排列
适用于在多个互斥的选项竖向排列的场景

`l-radio-group`和`e-radio`组合实现单选组， `l-radio-group` 设置 `direction` 值为 `vertical` 即可竖向排列。
```vue demo
<template>
  <div>
    <l-radio-group direction="vertical" v-model="group">
      <l-radio label="A">选项 A</l-radio>
      <l-radio label="B">选项 B</l-radio>
      <l-radio label="C">选项 C</l-radio>
      <l-radio label="D">选项 D</l-radio>
    </l-radio-group>
  </div>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const group = ref('A');
    return {group}
  },
})
</script>
```

## 带有边框
设置 `border` 属性为 `true `可以渲染为带有边框的单选框。
```vue demo
<template>
  <l-radio v-model="radio" border label="A">选项 A</l-radio>
  <l-radio v-model="radio" border label="B">选项 B</l-radio>
  <l-radio v-model="radio" border label="C">选项 C</l-radio>
  <l-radio v-model="radio" border label="D">选项 D</l-radio>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('A');
    return {radio}
  },
})
</script>
```
## 不显示圆点
设置 `dot` 属性为 `false `可以渲染为不带圆点单选框。
```vue demo
<template>
  <l-radio v-model="radio" border label="A" :dot="false">选项 A</l-radio>
  <l-radio v-model="radio" border label="B" :dot="false">选项 B</l-radio>
  <l-radio v-model="radio" border label="C" :dot="false">选项 C</l-radio>
  <l-radio v-model="radio" border label="D" :dot="false">选项 D</l-radio>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const radio = ref('A');
    return {radio}
  },
})
</script>
```