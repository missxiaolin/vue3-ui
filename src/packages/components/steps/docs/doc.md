## Steps 步骤条

### 基本用法
```vue demo
<template>
    <div>
        <l-steps :active="active" finish-status="success">
            <l-step title="步骤 1"></l-step>
            <l-step title="步骤 2"></l-step>
            <l-step title="步骤 3"></l-step>
        </l-steps>
        <l-button style="margin-top: 12px;" @click="next">下一步</l-button>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const active = ref(0)

    const next = () => {
        if (active.value ++ > 2) active.value = 0
    }

    return {
        active,
        next
    }
  },
};
</script>
```