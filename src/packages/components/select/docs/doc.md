# Select 筛选框


## 基础用法

```vue demo
<template>
<l-row :cols="3">
    <l-col>
        <l-select v-model="value" placeholder="Select">
            <l-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </l-option>
        </l-select>
    </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

let options =  ref([])
for(let i = 1; i <= 10; i++) {
  options.value.push({
    value: `Option${i}`,
    label: `Option${i}`,
  })
}
</script>

```