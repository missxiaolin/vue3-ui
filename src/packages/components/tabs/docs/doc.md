# Tabs 标签页
用于分割内容上有关联但属于不同类别的数据集合

### 基础用法
基础的、简洁的标签页

Tabs 组件提供了选项卡的功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

``` vue demo
<template>
  <l-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <l-tab-pane label="User" name="first">User</l-tab-pane>
    <l-tab-pane label="Config" name="second">Config</l-tab-pane>
    <l-tab-pane label="Role" name="third">Role</l-tab-pane>
    <l-tab-pane label="Task" name="fourth">Task</l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event)
}

</script>

```

### 卡片风格的标签

你可以设置具有卡片风格的标签。

只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

```vue demo
<template>
  <l-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <l-tab-pane label="User" name="first">User</l-tab-pane>
    <l-tab-pane label="Config" name="second">Config</l-tab-pane>
    <l-tab-pane label="Role" name="third">Role</l-tab-pane>
    <l-tab-pane label="Task" name="fourth">Task</l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event)
}
</script>

```

### 带有边框的卡片风格

你还可以设置标签页为带有边框的卡片。

将 `type` 属性为 `border-card`。

```vue demo
<template>
  <l-tabs
    v-model="activeName"
    type="border-card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <l-tab-pane label="User" name="first">User</l-tab-pane>
    <l-tab-pane label="Config" name="second">Config</l-tab-pane>
    <l-tab-pane label="Role" name="third">Role</l-tab-pane>
    <l-tab-pane label="Task" name="fourth">Task</l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event)
}
</script>
```

### 标签位置的设置

可以通过 `tab-position` 设置标签的位置

标签一共有四个方向的设置 `tabPosition="left | right | top | bottom"`

```vue demo
<template>
    <l-button label="top" @click="changPos('top')">top</l-button>
    <l-button label="right" @click="changPos('right')">right</l-button>
    <l-button label="bottom" @click="changPos('bottom')">bottom</l-button>
    <l-button label="left" @click="changPos('left')">left</l-button>

  <l-tabs
    style="height: 200px"
    :tab-position="tabPosition"
    class="demo-tabs"
  >
    <l-tab-pane label="User" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">User
    </l-tab-pane>
    <l-tab-pane label="Config" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">Config
    </l-tab-pane>
    <l-tab-pane label="Role" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">Role
    </l-tab-pane>
    <l-tab-pane label="Task" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">Task
    </l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tabPosition = ref('top')

const changPos = (str) => {
  tabPosition.value = str
}

</script>
```

## 自定义标签页的内容

可以通过具名插槽来实现自定义标签页的内容

```vue demo
<template>
  <l-tabs class="demo-tabs">
    <l-tab-pane>
      <template #label>
        <span>
          <l-icon icon="l-shengyin" size="16" color="#29c1c2"></l-icon>Route
        </span>
      </template>
      Route
    </l-tab-pane>
    <l-tab-pane label="Config">Config</l-tab-pane>
    <l-tab-pane label="Role">Role</l-tab-pane>
    <l-tab-pane label="Task">Task</l-tab-pane>
  </l-tabs>
</template>

<script lang="ts" setup>

</script>
```

### 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

```vue demo
<template>
  <l-tabs
    v-model="editableTabsValue"
    type="card"
    editable
    class="demo-tabs"
    @edit="handleTabsEdit"
  >
    <l-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}
</script>
```

### 自定义增加标签页触发器

``` vue demo
<template>
  <div style="margin-bottom: 20px">
    <l-button size="small" @click="addTab(editableTabsValue)">
      add tab
    </l-button>
  </div>
  <l-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
  >
    <l-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </l-tab-pane>
  </l-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>
```


### 属性说明

|属性 |说明 |类型 |可选值 |默认值
|---- |----- |------ |---  |---- |
|model-value / v-model |绑定值，选中选项卡的name |string / name |— |第一个选项卡的 name |
|type |风格类型 |string |card / border-card |— |
|closable |标签是否可关闭 |boolean |— |false |
|addable |标签是否可增加 |boolean |— |false |
|editable |标签是否同时可增加和关闭 |boolean |— |false |
|tab-position |选项卡所在位置 |string |top/right/bottom/left |top |
|stretch |标签的宽度是否自撑开 |boolean |- |false |
|before-leave |切换标签之前的钩子函数，若返回 `false` 或者返回被 reject 的 `Promise` ，则阻止切换。 |Funtion(activeName, oldActiveName) |- |— |


### Tabs 事件

|事件名	|说明	|回调参数	|
|---- |------- |---- |
|tab-click |tab 被选中时触发 |tab 被点击的标签 |
|tab-remove |点击 tab 移除按钮后触发 |name，被删除的标签的名字 |
|tab-add |点击 tabs 的新增按钮后触发 |- |
|edit |点击 tabs 的新增按钮或者 tab被关闭后触发 |(targetName, action) |


## Tabs 插槽

| 插槽名 | 说明 |子标签 |
| ---- | ------------------------- | --- |
| —    | 默认插槽 | Tab-pane | 


### Tab-pane 属性

|属性 |说明	|类型	|可选值 |默认值 |
|---- |------- |---- |--- |----|
|label |选项卡标题 |string |- |- |
|disabled |是否禁用 |boolean |- |false |
|name |与选项卡绑定值 value 对应的标识符，标识选项卡别名 |string / number |- |该选项卡在选项卡列表的书须知，如第一个选项卡则为'1' |
|closable |标签是否可关闭 |boolean |- |false |
|lazy |标签是否延迟渲染 |boolean |- |false |

## Tab-pane 插槽

| 插槽名 | 说明 |
| ---- | ------------------------- |
| —    | Tab-pane 的内容 |
| label | Tab-pane 的标题内容 |