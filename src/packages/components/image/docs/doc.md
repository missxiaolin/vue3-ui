# Image 图片
图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等


### 基础用法
可通过fit确定图片如何适应到容器框，同原生 (object-fit)[https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit]。
```vue demo
<template>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <l-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
```


### 占位内容
可通过`slot = placeholder`可自定义占位内容
```vue demo
<template>
  <l-row :cols="2" labelColumn>
    <l-col label="Default">
      <l-image :src="src" />
    </l-col>
    <l-col label="Custom">
      <l-image :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </l-image>
    </l-col>
  </l-row>
</template>
<script lang="ts" setup>
const src =
  'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
</script>
```

### 加载失败
可通过`slot = error`可自定义加载失败内容
```vue demo
<template>
  <l-row :cols="2" labelColumn>
    <l-col label="Default">
      <l-image />
    </l-col>
    <l-image>
      <template #error>
        <div class="image-slot">
          <l-icon icon="l-tupian2"></l-icon>
        </div>
      </template>
    </l-image>
  </l-row>
</template>
<script lang="ts" setup>
const src =
  'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
</script>
```

### 懒加载
可通过`lazy`开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 `scroll-container `来设置滚动容器， 若未定义，则为最近一个 `overflow` 值为 `auto` 或 `scroll` 的父元素。
```vue demo
<template>
  <div class="demo-image__lazy">
    <l-image v-for="url in urls" :key="url" :src="url" lazy />
  </div>
</template>

<script lang="ts" setup>
const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
</script>

```

### 图片预览
可通过 `previewSrcList` 开启预览大图的功能。 你可以通过 `initial-index` 初始化第一张预览图片的位置。 默认初始位置为 0。
```vue demo
<template>
  <div class="demo-image__preview">
    <l-image
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<script lang="ts" setup>
const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
</script>
```

## ROW 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| alt	| 原生 alt| 	string| 	-	| -| 
| fit	| 确定图片如何适应容器框，同原生 object-fit| 	string| 	fill / contain / cover / none / scale-down| 	-| 
| hide-on-click-modal	| 当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview	| boolean	| true / false| 	false| 
| initial-index	| 初始预览图像索引，小于 url-list 的长度| 	number| 	int	| 0| 
| lazy| 	是否使用懒加载| 	boolean| 	—| 	false| 
| preview-src-list	| 开启图片预览功能| 	Array	| —	| -| 
| referrer-policy	| 原生 | referrer-policy 属性	 string| 	-	| -| 
| src	| 图片源，同原生属性一致	| string	| —| 	-| 
| scroll-container| 	开启懒加载后，监听 scroll 事件的容器	| string / HTMLElement| 	—	| 最近一个 overflow 值为 auto 或 scroll 的父元素| 
| z-index	| 设置图片预览的 z-index| 	Number| 	—| 	2000| 
| preview-teleported	| whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`| 	boolean| 	—	| false| 

## Image 事件

| 事件名	| 说明	| 回调参数| 
|---- |----- |------ | 
| load	| 图片加载成功触发| 	(e: Event)| 
| error	| 图片加载失败触发	| (e: Error)| 

## Image 插槽#
| 插槽名	| 说明| 
| ------| -----| 
| placeholder	| 图片未加载的占位内容| 
| error| 	加载失败的内容| 

## ImagePreview 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- | 
|url-list	| 用于预览的图片链接列表| 	Array`<string>`	| -	| []| 
| z-index	| 预览时遮罩层的 | z-index| 	number / string 	int / string`<int>`	| 2000| 
| initial-index	| 预览的首张图片的位置, 小于等于数组长度| 	number| 	int	| 0| 
| infinite	| 是否可以无限循环预览| 	boolean	| true / false	| true| 
| hide-on-click-modal	| 是否可以通过点击遮罩层关闭预览| 	boolean| 	true / false| 	false| 
| teleported	| image 自身是否插入至 body 元素上。 嵌套的父元素设置了 transform 属性必须指定该属性并赋值为 true| 	boolean	| —	| false| 


## ImagePreview 事件

| 事件名	| 说明	| 回调参数| 
|---- |----- |------ |
| close	| 当点击 X 按钮或者在 hide-on-click-modal 为 true 时点击遮罩层时触发| 	无| 
| switch| 	当图片切换时触发| 	 (val: number) 切换目标的下标| 
