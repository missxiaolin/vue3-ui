## 按钮

### 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

```vue demo


<template>
    <l-row :cols="1">
        <l-col>
            <l-button>Default</l-button>
            <l-button type="primary" :disabled="submitdisabled">Primary</l-button>
            <l-button type="success" @click="submitdisabledchange">Success</l-button>
            <l-button type="info">Info</l-button>
            <l-button type="warning">Warning</l-button>
            <l-button type="danger">Danger</l-button>
            <l-button type="gary">gary</l-button>
            <l-button>中文</l-button>
        </l-col>
        <l-col>
            <l-button plain>Default</l-button>
            <l-button type="primary" plain>Primary</l-button>
            <l-button type="success" plain>Success</l-button>
            <l-button type="info" plain>Info</l-button>
            <l-button type="warning" plain>Warning</l-button>
            <l-button type="danger" plain>Danger</l-button>
            <l-button type="gary" plain>gary</l-button>
        </l-col>
        <l-col>
            <l-button round>Round</l-button>
            <l-button type="primary" round>Primary</l-button>
            <l-button type="success" round>Success</l-button>
            <l-button type="info" round>Info</l-button>
            <l-button type="warning" round>Warning</l-button>
            <l-button type="danger" round>Danger</l-button>
            <l-button type="gary" round>gary</l-button>
        </l-col>
        <l-col>
            <l-button type="success" icon="l-loading" circle></l-button>
        </l-col>
    </l-row>
</template>

<script lang="ts">
import {ref} from "vue"
export default {
  setup() {
    const submitdisabled =  ref(true);
    const submitdisabledchange = (event: Event)=> {
      submitdisabled.value = !submitdisabled.value 
    }
    return {
      submitdisabled,
      submitdisabledchange
    };
  }
}
</script>
```

### 禁用状态
按钮不可用状态。
```vue demo
<template>
  <div class="md-button">
    <div>
      <l-button disabled>Default</l-button>
      <l-button type="primary" disabled>Primary</l-button>
      <l-button type="success" disabled>Success</l-button>
      <l-button type="info" disabled>Info</l-button>
      <l-button type="warning" disabled>Warning</l-button>
      <l-button type="danger" disabled>Danger</l-button>
      <l-button type="gary" disabled>gary</l-button>
      <l-button disabled>中文</l-button>
    </div>
  </div>
</template>
```

### 文字按钮
按钮不可用状态。
```vue demo
<template>
  <div class="md-button">
    <div>
      <l-button type="text">文字按钮</l-button>
      <l-button type="text" disabled>文字按钮</l-button>
    </div>
  </div>
</template>
```

### 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。

```vue demo
<template>
  <l-row :cols="1">
    <l-col>
      <l-button  type="primary" @click="handleClick" :loading="loading" size="small">点击加载</l-button>
      <l-button  type="success" @click="handleClick" :loading="true" size="small">加载中</l-button>
      <l-button  type="gary" @click="handleClick" :loading="loading" size="small">加载中</l-button>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    let loading = ref(false)
    console.log('ceshi')
    const handleClick = (event: Event)=> {
      loading.value = true;
      console.log("--- 触发点击 ----")
      setTimeout(()=>{
        loading.value = false;
      },2000)
    }
    return {
      handleClick,
      loading
    };
  },
};
</script>
```


### 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
```vue demo
<template>
  <l-row :cols="1" grid>
    <l-col>
      <l-button>默认按钮</l-button>
      <l-button size="medium">中等按钮</l-button>
      <l-button size="small">小型按钮</l-button>
      <l-button size="mini">超小按钮</l-button>
    </l-col>
    <l-col>
      <l-button round>默认按钮</l-button>
      <l-button size="medium" round>中等按钮</l-button>
      <l-button size="small" round>小型按钮</l-button>
      <l-button size="mini" round>超小按钮</l-button>
    </l-col>
  </l-row>
</template>
```

### 防爆点击
默认时间: 500ms。

```vue demo
<template>
  <l-row :cols="1">
    <l-col>
      <l-button @click="handleClick" :click-time="2000">2000ms 点击时间</l-button>
    </l-col>
  </l-row>
</template>
<script lang="ts">
export default {
  setup() {
    const handleClick = (event: Event)=> {
      console.log('---- 单击时间 ----', new Date().getTime())
    }
    return {
      handleClick
    };
  },
};
</script>
```

### Button 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|size	|尺寸	|string	|medium / small / mini|	—|
|type	|类型	string	|primary / success / warning / danger / info / gary / text|	—|
|plain	|是否为朴素按钮	|boolean|	—|	false|
|round	|是否为圆角按钮	|boolean|	—|	false|
|circle	|是否为圆形按钮	|boolean|	—	|false|
|loading	|是否为加载中状态	|boolean|	—	|false|
|disabled	|是否为禁用状态	|boolean|	—	|false|
|icon	|图标组件样式名，详情参考[icon](/icon)	| string	|—	|—|
|autofocus	|是否默认聚焦	|boolean|	—	|false|
|native-type	|原生 type 属性	|string	|button / submit / reset	|button|
|click-time	| 防爆点击时间	| number	| -	| 500 |
