## 图标

提供了一套常用的图标集合。

```vue demo
<template>
     <div class="md-icon-font">
        <l-icon icon="l-caidanlanwode" size="30" color="var(--color-input-text)"></l-icon>
    </div>
</template>
<script lang="ts">
import useClipboard from 'vue-clipboard3'
import { defineComponent, ref, h, getCurrentInstance } from 'vue'
export default {
    setup() {
        let { proxy } = getCurrentInstance()
        const { toClipboard } = useClipboard()
        const handleCopy = async (iconClass) => {
            try {
                await toClipboard(`l-icon-${iconClass}`)
                proxy.$message({
                type: 'success',
                message: `e-icon-${iconClass} 复制成功`,
                })
            } catch (e) {
                console.error(e)
            }
        }
        return {
            handleCopy,
            iconfont: [
                {
                "icon_id": "1141959",
                "name": "菜单栏_我的",
                "font_class": "caidanlanwode",
                "unicode": "e696",
                "unicode_decimal": 59030
                },
                {
                "icon_id": "6265251",
                "name": "菜单栏",
                "font_class": "list2",
                "unicode": "e655",
                "unicode_decimal": 58965
                }
            ],
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