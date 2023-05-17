## 锚点

### 介绍

用于跳转到页面指定位置。

### 基础用法
最简单的用法。
```vue demo
<template>
    <div style="background: #F5F6F9;padding: 20px;">
        <l-anchor :affix="true" :offsetTop="50" :targetOffset="20" defaultAnchor="anchor-1231锚点"  wrapperClass="my-wrapperClass">
            <l-anchor-link href="#anchor-1231锚点" title="锚点">
                <l-anchor-link href="#介绍" title="介绍" />
                <l-anchor-link href="#基础用法" title="基础用法" />
            </l-anchor-link>
            <l-anchor-link href="#api" title="API">
                <l-anchor-link href="#anchor-属性" title="anchor-属性"></l-anchor-link>
                <l-anchor-link href="#anchor抛出事件" title="anchor抛出事件"></l-anchor-link>
                <l-anchor-link href="#link-props" title="anchor Link Props"></l-anchor-link>
            </l-anchor-link>
        </l-anchor>
    </div>
</template>
```



## API

### anchor 属性

|属性	|说明	|类型 |默认值 |
|---- |----- |------ |---  |
| target | 锚点控制的滚动容器 | string(id) | 默认锚点所在的最近上级可滚动容器 |
| bounds | 锚点区域边界 | number | 5(px)  |
| targetOffset | 锚点滚动偏移量（距离锚点多少触发） | number | 0  |
| affix | 固定模式 | boolean | false  |
| offsetTop | 当 `affix =true` 时生效， 距离窗口顶部达到指定偏移量后触发 | number | -  |
| showInkInFixed | `TODO` 固定模式是否显示小圆点 | boolean | false  |
| wrapperClass | 容器的类名 | string | -  |
| wrapperStyle | 容器样式 | object | -  |
| getCurrentAnchor | 自定义高亮的锚点 | () => string | -  |
| defaultAnchor  | 默认选中锚点，用于锚点在页面下方， | string | -  |

### anchor抛出事件
|事件名 | 说明 | 参数 |
| --- | --- | ---- |
| scrollTo | 滚动到指定节点 | link: '#anchor1' |
### anchor 事件
|事件名	|说明	|参数|
|----|----|---|
|change | 监听锚点链接改变 | (currentActiveLink: string) => void |
|click | click 事件的 handler | Function(e: Event, link: Object) |

### Link Props
|成员	|说明	|类型	|默认值 |
|----|----|----|----|
|href |锚点链接 |string|----|
|target |该属性指定在何处显示链接的资源 |string|----|
|title |	文字内容 | string | slot |----|
