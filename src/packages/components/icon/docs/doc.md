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
                "icon_id": "125896",
                "name": "错误",
                "font_class": "cuowu",
                "unicode": "e601",
                "unicode_decimal": 58881
                },
                {
                "icon_id": "2076349",
                "name": "正确",
                "font_class": "zhengque",
                "unicode": "e8ad",
                "unicode_decimal": 59565
                },
                {
                "icon_id": "3868273",
                "name": "警告",
                "font_class": "jinggao",
                "unicode": "eb65",
                "unicode_decimal": 60261
                },
                {
                "icon_id": "13639799",
                "name": "左边",
                "font_class": "zuobian1",
                "unicode": "e604",
                "unicode_decimal": 58884
                },
                {
                "icon_id": "13639800",
                "name": "右边",
                "font_class": "youbian1",
                "unicode": "e605",
                "unicode_decimal": 58885
                },
                {
                "icon_id": "17204046",
                "name": "更多",
                "font_class": "xianxingtubiaozhizuomoban-25",
                "unicode": "e61c",
                "unicode_decimal": 58908
                },
                {
                "icon_id": "6616997",
                "name": "关闭",
                "font_class": "guanbi1",
                "unicode": "eca0",
                "unicode_decimal": 60576
                },
                {
                "icon_id": "1305406",
                "name": "上",
                "font_class": "shang",
                "unicode": "e63c",
                "unicode_decimal": 58940
                },
                {
                "icon_id": "1305407",
                "name": "下",
                "font_class": "xia",
                "unicode": "e63d",
                "unicode_decimal": 58941
                },
                {
                "icon_id": "577394",
                "name": "向上1",
                "font_class": "xiangshang1",
                "unicode": "e76d",
                "unicode_decimal": 59245
                },
                {
                "icon_id": "577398",
                "name": "向下1",
                "font_class": "xiangxia1",
                "unicode": "e771",
                "unicode_decimal": 59249
                },
                {
                "icon_id": "671296",
                "name": "系统返回",
                "font_class": "xitongfanhui",
                "unicode": "e6b6",
                "unicode_decimal": 59062
                },
                {
                "icon_id": "689249",
                "name": "回到顶部",
                "font_class": "huidaodingbu",
                "unicode": "e7ed",
                "unicode_decimal": 59373
                },
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