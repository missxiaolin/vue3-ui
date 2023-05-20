# Badge 徽章
按钮和图标上的数字或状态标记。

### 基础用法
可以用来展示新消息的数量。

通过设置 `value` 来调整标记所展示的内容，支持 `Number` or `String` 作为参数
```vue demo
<template>
    <l-row :cols="5">
        <l-col>
            <l-badge :value="12">
                <l-button size="small">comments</l-button>
            </l-badge>
        </l-col>
        <l-col>
            <l-badge :value="3">
                <l-button size="small">comments</l-button>
            </l-badge>
        </l-col>
        <l-col>
            <l-badge :value="1">
                <l-button size="small">comments</l-button>
            </l-badge>
        </l-col>
    </l-row>
    
</template>
```