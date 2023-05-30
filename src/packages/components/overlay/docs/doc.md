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

### 遮罩样式
```vue demo
<template>
    <div>
        <l-button type="primary" @click="show = true">显示遮罩层</l-button>
        <l-overlay v-model:visible="show" :overlay-style="overlayStyle"></l-overlay>
        
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const show = ref(false)
    const overlayStyle = ref({
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    })
    return {
        show,
        overlayStyle
    }
  },
};
</script>
```

### 设置动画时间
```vue demo
<template>
    <div>
        <l-button type="primary" @click="show = true">显示遮罩层</l-button>
        <l-overlay v-model:visible="show" :duration="2.5"></l-overlay>
        
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const show = ref(false)
    return {
        show,
    }
  },
};
</script>
```

### 锁定背景滚动
```vue demo
<template>
    <div>
        <l-button type="primary" @click="show = true">显示遮罩层</l-button>
        <l-overlay v-model:visible="show" :lock-scroll="true"></l-overlay>
        
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const show = ref(false)
    return {
        show,
    }
  },
};
</script>
```

### 嵌套内容
```vue demo
<template>
    <div>
        <l-button type="primary" @click="show = true">显示遮罩层</l-button>
        <l-overlay v-model:visible="show">
          <div class="wrapper" style="display: flex;height: 100%;align-items: center;justify-content: center;">
            <div class="content" style="display: flex;width: 150px;height: 150px;background: #fff;border-radius: 8px;align-items: center;justify-content: center;color: red;">这里是正文</div>
          </div>
        </l-overlay>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const show = ref(false)
    return {
        show,
    }
  },
};
</script>
```

### 点击遮罩不关闭
```vue demo
<template>
    <div>
        <l-button type="primary" @click="show = true">显示遮罩层</l-button>
        <l-overlay v-model:visible="show" :close-on-click-overlay="false">
          <div class="wrapper" style="display: flex;height: 100%;align-items: center;justify-content: center;">
            <div class="content" style="display: flex;width: 150px;height: 150px;background: #fff;border-radius: 8px;align-items: center;justify-content: center;color: red;">这里是正文</div>
          </div>
        </l-overlay>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const show = ref(false)
    return {
        show,
    }
  },
};
</script>
```

### 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|v-model:visible	|控制遮罩的显示/隐藏	|boolean	|-|	|
|z-index	|自定义遮罩层级	|string/number	|-|	|
|duration	|显示/隐藏的动画时长，单位秒	|string/number |-|	|
|overlay-class	|自定义遮罩类名	|string |-|	|
|overlay-style	|自定义遮罩样式	|CSSProperties |-|	|
|lock-scroll	|遮罩显示时的背景是否锁定	|boolean |-|	|
|close-on-click-overlay	|点击遮罩时是否关闭	|boolean |-|	|

## 方法

| 方法名 | 参数类型 | 说明 |
| ---- | ---- | ---- |
| click | - | 点击触发 |

### 插槽

|事件名| 说明|
| ---- | ---- |
|default| 内嵌遮罩内容自定义|