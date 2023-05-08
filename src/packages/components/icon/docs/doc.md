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
            iconfont: [
                {
                "icon_id": "201557",
                "name": "关闭",
                "font_class": "guanbi",
                "unicode": "e600",
                "unicode_decimal": 58880
                },
                {
                "icon_id": "1305488",
                "name": "loading",
                "font_class": "loading",
                "unicode": "e644",
                "unicode_decimal": 58948
                },
                {
                "icon_id": "2076243",
                "name": " 增加",
                "font_class": "zengjia",
                "unicode": "e889",
                "unicode_decimal": 59529
                },
                {
                "icon_id": "2076340",
                "name": "刷新",
                "font_class": "shuaxin",
                "unicode": "e8aa",
                "unicode_decimal": 59562
                },
                {
                "icon_id": "4325757",
                "name": "icon_loading",
                "font_class": "icon_loading",
                "unicode": "eb80",
                "unicode_decimal": 60288
                },
                {
                "icon_id": "4425831",
                "name": "左边",
                "font_class": "zuobian",
                "unicode": "e799",
                "unicode_decimal": 59289
                },
                {
                "icon_id": "4425832",
                "name": "右边",
                "font_class": "youbian",
                "unicode": "e79a",
                "unicode_decimal": 59290
                },
                {
                "icon_id": "5387553",
                "name": "搜索",
                "font_class": "sousuo",
                "unicode": "eafe",
                "unicode_decimal": 60158
                },
                {
                "icon_id": "5831299",
                "name": "下载",
                "font_class": "xiazai",
                "unicode": "e647",
                "unicode_decimal": 58951
                },
                {
                "icon_id": "6129054",
                "name": "18.错误、关闭、失败",
                "font_class": "cuowuguanbishibai",
                "unicode": "e75f",
                "unicode_decimal": 59231
                },
                {
                "icon_id": "7872845",
                "name": "成功",
                "font_class": "chenggong",
                "unicode": "e643",
                "unicode_decimal": 58947
                },
                {
                "icon_id": "11372700",
                "name": "声音",
                "font_class": "shengyin",
                "unicode": "e8b8",
                "unicode_decimal": 59576
                },
                {
                "icon_id": "34023977",
                "name": "loading_line",
                "font_class": "loading_line",
                "unicode": "e763",
                "unicode_decimal": 59235
                },
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