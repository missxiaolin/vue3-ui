# Input 输入框

通过鼠标或键盘输入字符
> Input 为受控组件，它 总会显示 Vue 绑定值。不支持 `v-model` 修饰符。

### 基础用法

```vue demo
<template>
  <l-row :cols="3">
    <l-col>
      <l-input v-model="input" placeholder="请输入文本"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      input: ref('')
    };
  }
});
</script>