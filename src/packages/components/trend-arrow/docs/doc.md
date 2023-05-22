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

### 设置图标左右
```vue demo
<template>
    <div>
        <l-trend-arrow :arrow-left="true" :sync-text-color="false" :rate="1"></l-trend-arrow>
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

### 指定小数位
```vue demo
<template>
    <div>
        <l-trend-arrow :digits="0" :rate="10.2365"></l-trend-arrow>
        <l-trend-arrow :digits="0" :rate="-1.4535"></l-trend-arrow>
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

### 显示正负号
```vue demo
<template>
    <div>
        <l-trend-arrow showSign :rate="1"></l-trend-arrow>
        <l-trend-arrow showSign :rate="-0.2535"></l-trend-arrow>
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

### 是否展示0
```vue demo
<template>
    <div>
        <l-trend-arrow showSign :rate="0"></l-trend-arrow>
        <l-trend-arrow showSign showZero :rate="0"></l-trend-arrow>
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
