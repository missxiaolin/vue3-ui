# Scrollbar 滚动条
`maxHeight`、`height` 或 `css Height` 必须设置一个，否者不生效
### 基础用法

鼠标放上去触发显示坐标、设置轨道，滚动条样式

```vue demo
<template>
<div style="width: 100%; display: flex; height: 200px">
  <div style="flex:1">
    <l-scroll
    trigger="hover"
    direction="all"
    :vBarStyle="{
      'background-color':'rgba(0,0,0,0.1)'
    }"
    :hBarStyle="{
      'background-color':'rgba(0,0,0,0.2)'
    }"
    :vThumbStyle="{
      'background-color':'rgba(0,0,0,0.3)'
    }"
    :hThumbStyle="{
      'background-color':'rgba(0,0,0,0.4)'
    }"
    :finished="finished"
    @scroll="handleScroll"
    @load="handleLoad">
    <ol>
      <li v-for="(item, index) in list" :key="index">
        {{ item.text }}
      </li>
    </ol>
  </l-scroll>
  </div>
  <div style="width: 300px;"></div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {

    let list = ref([]);
    for(let i=0, len = 20; i <=len; i++){
      list.value.push({text:"UI"})
    }

    const finished = ref(false);

    const handleScroll = (event: Event) => {
      // console.log(event);
    }
    let i = 0;
    const handleLoad = (done)=>{
      console.log('-- 触发加载 --')
      setTimeout(()=>{
        i++;
        if (i < 3){
          list.value.push({text: 'UI -- UI' + i});
        } else {
          finished.value = true;
        }
        
        done()
      },2000)
    }
    return {
      handleScroll,
      handleLoad,
      list,
      finished
    };
  },
};
</script>
  
```

### 最大高度，最大宽度设置

最大高度，最大宽度设置，`max-width="100px"` `max-height="200px"`不显示轨道
```vue demo
<template>
  <l-scroll 
    max-width="100px"
    max-height="200px"
    direction="all">
    <ol style="width: 500px">
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
    </ol>
  </l-scroll>
</template>
```

### 滚动事件

鼠标放上去触发显示坐标、设置轨道，滚动条样式
```vue demo
<template>
  <l-scroll 
    ref="scrollbarRef"
    width="200px"
    height="200px"
    trigger="hover"
    direction="all">
    <ol>
      <li style="white-space:nowrap">一直显示滚动条一直显示滚动条一直显示滚动条一直显示滚动条一直显示滚动条一直显示滚动条一直显示滚动条</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
      <li>UI - UI</li>
    </ol>
  </l-scroll>
  <br>
  <l-button size="small" @click="handleScrollTo">点击滚动指定位置</l-button>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const scrollbarRef = ref();
    const handleScrollTo = (event: Event)=> {
      scrollbarRef.value.setScrollTop(100);
      scrollbarRef.value.setScrollLeft(100);
    }
    return {
      scrollbarRef,
      handleScrollTo
    };
  },
};
</script>
  
```


### Scrollbar 属性
| 属性	| 说明	| 类型	| 可选值| 	默认值| 
| ---- | ---- | ---- | ---- | ----- |
| maxHeight| 垂直方向 ，内容超过此高度出现滚动条。maxHeight、height都存在优先生效maxHeight | String / Number | - |  - | 
| maxWidth | 水平方向 ，内容超过此高度出现滚动条 。| String  / Number| - |  - | 
| height | 垂直方向，内容超过此高度出现滚动条。最好不要使用百分比，除非父级元素设置了具体高度.| String / Number | -  | 父级高度 | 
| width | 水平方向 ，内容超过此高度出现滚动条 。| String / Number | - |  父级宽度 | 
| trigger | 触发显示滚动条。'always' 一直显示 ，'hover' 鼠标移动上去显示 ， 'none' 不显示| String | 'always'、'hover'、'none'| 'always' |
|direction| 可滚动的方向。'all'垂直水平方向都可以滚动，'x'只可以在横向滚动，'y'只可以在垂直方向上滚动。|String|'all'、'x'、'y'|'all'|
|vBarStyle| 垂直方向上轨道样式设置。修改垂直方向上轨道的样式|Object|-|{'background-color': ''}|
|hBarStyle| 水平方向上轨道样式设置。修改水平方向上轨道的样式|Object|-|{'background-color': ''}|
|vThumbStyle| 垂直方向上滑块样式设置。修改垂直方向上滑块滑块的样式|Object|-|{'background-color': 'rgba(0, 0, 0, 0.2)'}|
|hThumbStyle| 水平方向上滑块样式设置。修改水平方向上滑块滑块的样式|Object|-|{'background-color': 'rgba(0, 0, 0, 0.2)'}|
| finished | 下拉加载完成 | boolean | - | false |
| finishedText | 下拉加载完成的底部提示语 | string | - | 你已经看到我的底线啦~ |
| scrollId | 滚动容器绑定的DOM id | string | - | - |
| scrollWrapStyle | 滚动容器的样式 | Object | - | - |

注：同时设置maxHeight、height或maxWidth、width，以较小者生效,尽量避免同事设置

## Scrollbar 方法

| 方法名 | 参数类型 | 说明 |
| ---- | ---- | ---- |
| setScrollTop | number | 调用方式 setScrollTop(scrollTop) |
| setScrollLeft | number | 调用方式 setScrollLeft(scrollLeft) |

### Scrollbar 事件

|事件名| 说明|
| ---- | ---- |
|scroll| 滚动时触发|
|onLoad| 滚动到底部加载事件时触发 （此方法与加载完成的tip共存，慎用）|