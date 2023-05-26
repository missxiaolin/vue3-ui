## 图标

提供了一套常用的图标集合。

```vue demo
<template>
    <div class="md-icon-font">
        <l-row :cols="6"  gutter="0">
            <l-col v-for="icon in iconfont" :key="icon.icon_id">
                <l-icon :icon="'l-'+icon.font_class" size="30" color="var(--color-input-text)"></l-icon>
                <div class="icon-class" @click="handleCopy(icon.font_class)">l-{{icon.font_class}}</div>
            </l-col>
        </l-row>    
    </div>
</template>
<script lang="ts">
import useClipboard from 'vue-clipboard3'
import { defineComponent, ref, h, getCurrentInstance } from 'vue'
import IconList from '../../../theme-chalk/font/iconfont.json'
export default {
    setup() {
        let { proxy } = getCurrentInstance()
        const { toClipboard } = useClipboard()
        const handleCopy = async (iconClass) => {
            try {
                await toClipboard(`l-${iconClass}`)
            } catch (e) {
                console.error(e)
            }
        }
        return {
            handleCopy,
            iconfont: IconList.glyphs
        }
    }
}
</script>
```

### 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|color	| 图标色	| string	| - |	#a1a6b2 |
|size	| 图标大小	| string / number	| - |	22px |