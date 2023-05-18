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


### 指定容器
可指定滚动容器，可与 `l-scroll` 一起用

```vue demo
<template>
  <div style="background: #F5F6F9; padding: 20px; display: flex;">
    <l-scroll scrollId="test-container" :height="500" style="margin-right: 10px;"
      :scrollWrapStyle="{ scrollBehavior: 'smooth' }">
      <e-anchor-point href="anchor-1" />
      <div style="height: 400px;background: red;">anchor1</div>
      <l-anchor-point href="anchor-2" />
      <div style="height: 400px;background: yellow;">anchor2</div>
      <l-anchor-point href="anchor-3" />
      <div style="height: 400px;background: blue;">anchor3</div>
      <l-anchor-point href="anchor-4" />
      <div style="height: 400px;background: pink;">anchor4</div>
      <l-anchor-point href="anchor-5" />
      <div style="height: 400px;background: black;">anchor5</div>
      <l-anchor-point href="anchor-6" />
      <div style="height: 400px;background: #29c1c2;">anchor6</div>
    </l-scroll>
    <l-anchor target="#test-container" :targetOffset="10" defaultAnchor="anchor-1">
      <l-anchor-link href="#anchor-1" title="anchor1"/>
      <l-anchor-link href="#anchor-2" title="anchor2"/>
      <l-anchor-link href="#anchor-3" title="anchor3"/>
      <l-anchor-link href="#anchor-4" title="anchor4"/>
      <l-anchor-link href="#anchor-5" title="anchor5"/>
      <l-anchor-link href="#anchor-6" title="anchor6"/>
    </l-anchor>
  </div>
</template>
<script></script>
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
