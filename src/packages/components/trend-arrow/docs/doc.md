## TrendArrow 趋势箭头

### 基础用法
```vue demo
<template>
    <div>
        <l-trend-arrow :rate="1"></l-trend-arrow>
        <l-trend-arrow :rate="-0.2535"></l-trend-arrow>
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
        <l-trend-arrow :arrow-left="true" :rate="1"></l-trend-arrow>
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

### 设置图标
```vue demo
<template>
    <l-trend-arrow showSign :rate="1" icon="l-zuobian"></l-trend-arrow>
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

### 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| rate	| 数值，大于0时箭头向上，小于0时箭头向下	| number	| —	| 0| 
| digits	| 小数位精度	| number	| top / bottom| 	-| 
| show-sign| 	是否显示加减号	| boolean| 	—| 	-| 
| show-zero	| 是否显示 0	| boolean| 	—	| -| 
| arrow-left	| 是否在数字左侧显示箭头	| boolean| 	—	| -| 
| text-color	| 文字颜色	| string| 	—	| -| 
| icon	| 图标	| string| 	—	| -| 
| icon-color	| 箭头颜色	| string| 	—	| -| 