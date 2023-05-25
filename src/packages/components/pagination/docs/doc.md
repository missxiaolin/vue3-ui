# Pagination 分页
当数据量过多时，使用分页分解数据。

### 基础用法
设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。` prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号->，->后的元素会靠右显示，`jumper`表示跳页元素，`tota`l表示总条目数，`size`用于设置每页显示的页码数量。

```vue demo
<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">当你只有几页的时候</div>
    <l-pagination layout="prev, pager, next" :total="50"></l-pagination>
  </div>
</template>
```