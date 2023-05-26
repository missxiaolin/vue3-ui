# Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。
### 基础用法#
悬停在下拉菜单上以展开更多操作。

通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

```vue demo
<template>
  <l-dropdown>
    <span class="e-dropdown-link">
      Dropdown List
      <e-icon class="e-icon--right" icon="e-icon-lower">
      </e-icon>
    </span>
    <template #dropdown>
      <l-dropdown-menu>
        <l-dropdown-item>Action 1</l-dropdown-item>
        <l-dropdown-item>Action 2</l-dropdown-item>
        <l-dropdown-item>Action 3</l-dropdown-item>
        <l-dropdown-item disabled>Action 4</l-dropdown-item>
        <l-dropdown-item divided>Action 5</l-dropdown-item>
      </l-dropdown-menu>
    </template>
  </l-dropdown>
</template>
<script lang="ts" setup>
</script>
```