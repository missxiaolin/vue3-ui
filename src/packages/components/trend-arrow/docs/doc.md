## TrendArrow 趋势箭头

### 基础用法
```vue demo
<template>
    <div>
        <l-trend-arrow :sync-text-color="false" :rate="1"></l-trend-arrow>
        <l-trend-arrow :sync-text-color="false" :rate="-0.2535"></l-trend-arrow>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    return {
    }
  },
};
</script>
```
