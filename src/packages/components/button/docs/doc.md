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