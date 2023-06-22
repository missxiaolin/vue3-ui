# ImagePreview 图片预览


### 基础用法
默认为全屏预览

```vue demo
<template>
<img :src="url" @click="handlePreview" style="width: 300px" />
    <l-image-preview
    v-if="previewShow"
    :url-list="previewSrcList"
    @close="handlePreview"
      >
    </l-image-preview>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    let previewShow = ref(false)
    const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const previewSrcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
const handlePreview = ()=>{
  previewShow.value = !previewShow.value
}
return {
  url,
  previewShow,
  previewSrcList,
  handlePreview
}
   
  }
});
</script>
```

### 显示在容器内
设置`position="absolute"` 可以在某个容器内局部预览图片，适用分屏功能

```vue demo
<template>
<div style=" width: 400px; height: 600px; border:1px solid #eee; position: relative">
  <img :src="url" @click="handlePreview" style="width: 300px" />
  <l-image-preview
    v-if="previewShow"
    :url-list="previewSrcList"
    @close="handlePreview"
    position="absolute"
      >
  </l-image-preview>
</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    let previewShow = ref(false)
    const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const previewSrcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
const handlePreview = ()=>{
  previewShow.value = !previewShow.value
}
return {
  url,
  previewShow,
  previewSrcList,
  handlePreview
}
   
  }
});
</script>
```


### 容器多组无联动预览

多组分屏对比预览

```vue demo
<template>
<div style=" width: 400px; height: 600px; border:1px solid #eee; position: relative">
<img :src="url" @click="handlePreview" style="width: 300px" />
  <l-drawer v-model="previewShow" :withHeader="true" :show-close="true" size="100%">
		<div style="display: flex; width: 100%; height: 90vh;">
			<div style="flex:1; position: relative; margin-right: 15px">
				<l-image-preview :show-close="false" position="absolute" :url-list="previewSrcList" ></l-image-preview>
			</div>
			<div style="flex:1; position: relative;">
				<l-image-preview  :show-close="false" position="absolute" :url-list="previewSrcList" ></l-image-preview>
			</div>
		</div>
	</l-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    let previewShow = ref(false)
    const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const previewSrcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
const handlePreview = ()=>{
  previewShow.value = !previewShow.value
}
return {
  url,
  previewShow,
  previewSrcList,
  handlePreview,
}
   
  }
});
</script>
```

### 容器多组联动预览

多组分屏联动对比预览

```vue demo
<template>
<div style=" width: 400px; height: 600px; border:1px solid #eee; position: relative">
<img :src="url" @click="handlePreview" style="width: 300px" />
  <l-drawer v-model="previewShow" :withHeader="true" :show-close="true" size="100%">
		<div style="display: flex; width: 100%; height: 90vh;">
			<div style="flex:1; position: relative; margin-right: 15px">
				<l-image-preview :show-close="false" position="absolute" :url-list="previewSrcList" :initial-index="initialIndex" @switch="handleImgSwitch"></l-image-preview>
			</div>
			<div style="flex:1; position: relative;">
				<l-image-preview  :show-close="false" position="absolute" :url-list="previewSrcList" :initial-index="initialIndex" @switch="handleImgSwitch"></l-image-preview>
			</div>
		</div>
	</l-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    let previewShow = ref(false)
    let initialIndex = ref(0)
    const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const previewSrcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
const handlePreview = ()=>{
  previewShow.value = !previewShow.value
}
const handleImgSwitch = (val: number)=>{
 initialIndex.value = val
 console.log('initialIndex.value = val----',initialIndex.value, val)
}
return {
  url,
  previewShow,
  previewSrcList,
  handlePreview,
  initialIndex,
  handleImgSwitch
}
   
  }
});
</script>
```

## ImagePreview 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- | 
| url-list	| 用于预览的图片链接列表| 	Array`<string>`	| -	| []| 
| z-index	| 预览时遮罩层的 | z-index| 	number / string| 	int / string`<int>`	| 2000| 
| initial-index	| 预览的首张图片的位置, 小于等于数组长度| 	number| 	int	| 0| 
| infinite	| 是否可以无限循环预览| 	boolean	| true / false	| true| 
| hide-on-click-modal	| 是否可以通过点击遮罩层关闭预览| 	boolean| 	true / false| 	false| 
| teleported	| image 自身是否插入至 body 元素上。 嵌套的父元素设置了 transform 属性必须指定该属性并赋值为 true| 	boolean	| —	| false| 
| position | 定位方式 | string |fixed / absolute  | fixed| 
| modal | 是否需要遮罩层 | boolean| - | true| 
| show-close | 是否显示关闭按钮	 |boolean| - | true| 

## ImagePreview 事件

| 事件名	| 说明	| 回调参数| 
|---- |----- |------ |
| close	| 当点击 X 按钮或者在 hide-on-click-modal 为 true 时点击遮罩层时触发| 	无| 
| switch| 	当图片切换时触发	| (val: number) 切换目标的下标| 