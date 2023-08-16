# TimePicker 时间选择器
用于选择或输入日期

## 任意时间点
可以选择任意时间

提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。

```vue demo
<template>
  <div class="example-basic">
    <l-row :cols="2">
      <l-col>
        <l-time-picker v-model="value1" placeholder="Arbitrary time" />
      </l-col>
    <l-col>
       <l-time-picker
      v-model="value2"
      arrow-control
      placeholder="Arbitrary time"
    />
      </l-col>
    </l-row>
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref()
const value2 = ref()
</script>