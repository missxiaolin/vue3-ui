## Steps 步骤条

### 基本用法
```vue demo
<template>
    <div>
        <l-steps :active="active" finish-status="success">
            <l-step title="步骤 1" description="描述"></l-step>
            <l-step title="步骤 2" description="描述"></l-step>
            <l-step title="步骤 3" description="描述"></l-step>
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

### 含状态步骤条
```vue demo
<template>
    <div>
        <l-steps :space="200" :active="1" finish-status="success">
            <l-step title="步骤 1" description="描述"></l-step>
            <l-step title="步骤 2" description="描述"></l-step>
            <l-step title="步骤 3" description="描述"></l-step>
        </l-steps>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    
  },
};
</script>
```

### 居中的步骤条
```vue demo
<template>
    <div>
        <l-steps :active="2" align-center>
            <l-step title="步骤 1" description="描述"></l-step>
            <l-step title="步骤 2" description="描述"></l-step>
            <l-step title="步骤 3" description="描述"></l-step>
        </l-steps>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    
  },
};
</script>
```

### 带图标的步骤条
```vue demo
<template>
    <div>
        <l-steps :active="1">
            <l-step title="步骤 1" description="描述" icon="l-sousuo"></l-step>
            <l-step title="步骤 2" description="描述" icon="l-xiazai"></l-step>
            <l-step title="步骤 3" description="描述" icon="l-caidanlanwode"></l-step>
        </l-steps>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    
  },
};
</script>
```

### 竖式步骤条
```vue demo
<template>
    <div style="height: 400px;">
        <l-steps :active="1" direction="vertical">
            <l-step title="步骤 1" description="描述"></l-step>
            <l-step title="步骤 2" description="描述"></l-step>
            <l-step title="步骤 3" description="描述"></l-step>
        </l-steps>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    
  },
};
</script>
```