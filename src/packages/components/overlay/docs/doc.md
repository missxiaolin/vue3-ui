## 遮罩

### 基本用法
```vue demo
<template>
    <div>
        <l-button type="primary" @click="show = true">显示遮罩层</l-button>
        <l-overlay v-model:visible="show"></l-overlay>
        
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const show = ref(false)
    return {
        show
    }
  },
};
</script>
```