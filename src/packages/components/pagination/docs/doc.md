# Pagination 分页
当数据量过多时，使用分页分解数据。

### 基础用法
设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。` prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号->，->后的元素会靠右显示，`jumper`表示跳页元素，`tota`l表示总条目数，`size`用于设置每页显示的页码数量。

```vue demo
<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">当你只有几页的时候</div>
    <l-pagination layout="prev, pager, next" :total="50"></l-pagination>
    <div class="example-demonstration">当你只有几页的时候</div>
    <l-pagination layout="prev, pager, next" :total="1000"></l-pagination>
  </div>
</template>
```

### 设置最大页码按钮数
默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 `pager-count` 属性可以设置最大页码按钮数。

```vue demo
<template>
  <l-pagination
    :page-size="20"
    :pager-count="11"
    layout="total, prev, pager, next"
    :total="total"
  >
  </l-pagination>
  <l-button type="primary" @click="changeTotal">改变总数</l-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const total = ref(1000);
const changeTotal = () => {
  total.value = 200
}
</script>
```

### 小型分页
在空间有限的情况下，可以使用简单的小型分页。

只需要设置 `small` 属性为 `true` 即可让分页变小。
```vue demo
<template>
  <l-pagination small layout="prev, pager, next" :total="500"> </l-pagination>
  <l-pagination
    small
    background
    layout="prev, pager, next"
    :total="50"
    class="mt-4"
  >
  </l-pagination>
</template>
```

### 附加功能
根据场景需要，可以添加其他功能模块。

```vue demo
<template>
<div class="demo-pagination-block">
    <div class="demonstration">Jump to</div>
    <l-pagination
      v-model:currentPage="currentPage3"
      v-model:page-size="pageSize3"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </l-pagination>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
```


 ### 属性
| 属性	| 说明	| 类型| 	可选值| 	默认值| 
| ----  | ---- |----  |----  |----  | 
| small| 	是否使用小型分页样式| 	boolean	| —	| false| 
| background| 	是否为分页按钮添加背景色| 	boolean| 	—| 	false| 
| page-size| 	每页显示条目个数，支持 v-model 双向绑定	| number| 	—	| 10| 
| default-page-size| 	每页显示条目数的初始值| 	number| 	-	| -| 
| total	| 总条目数| 	number| 	—| 	—| 
| page-count| 	总页数 total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性	| number| 	—| 	—| 
| pager-count	| 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠| 	number	| 5 ≤ x ≤ 21 | 的奇数	7| 
| current-page| 	当前页数，支持 v-model 双向绑定	| number| 	—	| 1| 
| default-current-page| 	当前页数的初始值| 	number| 	-| 	-| 
| layout| 	组件布局，子组件名用逗号分隔| 	string	| sizes / prev / pager / next / jumper / -> / total / slot	| 'prev, pager, next, jumper, ->, total'| 
| page-sizes| 	每页显示个数选择器的选项设置| 	number[]| 	—	| [10, 20, 30, 40, 50, 100]| 
| popper-class	| 每页显示个数选择器的下拉框类名| 	string| 	—| 	—| 
| prev-text	| 替代图标显示的上一页文字| 	string| 	—| 	—| 
| next-text	| 替代图标显示的下一页文字| 	string| 	—| 	—| 
| disabled| 	是否禁用分页| 	boolean	| —| 	false| 
| hide-on-single-page| 	只有一页时是否隐藏| 	boolean	| —	| -| 


### 事件
| 事件名| 	说明| 	参数| 
| ----  | ---- |----  |
| size-change	| pageSize|  改变时触发	| 新每页条数| 
| current-change| 	current-change | 改变时触发	| 新当前页| 
| prev-click| 	用户点击上一页按钮改变当前页时触发| 	新当前页| 
| next-click| 	用户点击下一页按钮改变当前页时触发| 	新当前页| 