
# tree 组件

## 介绍

用清晰的层级结构展示信息，可展开或折叠。  
**自定义节点类名和plus不同**  
**icon和plus不同**  

### 基础用法

基础的树形结构展示

```vue demo
<template>
  <l-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log("你点击了树的节点：",data)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>
```

### 可选择和动态加载

适用于需要选择层级时使用。

本例还展示了动态加载节点数据的方法。

```vue demo
<template>
  <l-tree
    :props="props"
    :load="loadNode"
    lazy
    show-checkbox
    @check-change="handleCheckChange"
  />
</template>

<script lang="ts" setup>
import type Node from '@/packages/tree/src/model/node'
let count = 1

interface Tree {
  name: string
}

const props = {
  label: 'name',
  children: 'zones',
}

const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log("数据：",data,"选中：", checked,"半选：", indeterminate)
}

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'Root1' }, { name: 'Root2' }])
  }
  if (node.level > 3) return resolve([])

  let hasChild = false
  if (node.data.name === 'region1') {
    hasChild = true
  } else if (node.data.name === 'region2') {
    hasChild = false
  } else {
    hasChild = true
    // hasChild = Math.random() > 0.5
  }

  setTimeout(() => {
    let data: Tree[] = []
    if (hasChild) {
      data = [
        {
          name: `zone${count++}`,
        },
        {
          name: `zone${count++}`,
        },
      ]
    } else {
      data = []
    }

    resolve(data)
  }, 500)
}
</script>

```

### 懒加载自定义叶子节点

由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点， 所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。 同时，你也可以提前告知 Tree 某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。

```vue demo
<template>
  <l-tree :props="props" :load="loadNode" lazy show-checkbox />
</template>

<script lang="ts" setup>
import type Node from '@/packages/tree/src/model/node'

interface Tree {
  name: string
  leaf?: boolean
}

const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
}

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }])
  }
  if (node.level > 1) return resolve([])

  setTimeout(() => {
    const data: Tree[] = [
      {
        name: 'leaf',
        leaf: true,
      },
      {
        name: 'zone',
      },
    ]

    resolve(data)
  }, 500)
}
</script>
```

### 默认展开和默认选中

节点的复选框可以设置为禁用。

在示例中，通过 disabled 设置禁用状态。 相应的复选框已禁用，不能点击。

```vue demo
<template>
  <l-tree :data="data" :props="defaultProps" show-checkbox />
</template>

<script lang="ts" setup>
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}

const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 3,
        label: 'Level two 2-1',
        children: [
          {
            id: 4,
            label: 'Level three 3-1-1',
          },
          {
            id: 5,
            label: 'Level three 3-1-2',
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: 'Level two 2-2',
        disabled: true,
        children: [
          {
            id: 6,
            label: 'Level three 3-2-1',
          },
          {
            id: 7,
            label: 'Level three 3-2-2',
            disabled: true,
          },
        ],
      },
    ],
  },
]
</script>
```

### 默认展开以及默认选中

可将 Tree 的某些节点设置为禁用状态

分别通过 default-expanded-keys 和 default-checked-keys 设置默认展开和默认选中的节点。 需要注意的是，此时必须设置 node-key， 其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。
  **如果父节点node-key选中则所有子孙节点均会选中**

```vue demo
<template>
  <l-tree
    :data="data"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[3,5]"
    :props="defaultProps"
  />
</template>

<script lang="ts" setup>
const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>
```

### 树节点的选择

本例展示如何获取和设置选中节点。 获取和设置各有两种方式：通过 node 或通过 key。 **如果需要通过 key 来获取或设置，则必须设置 node-key。**

```vue demo
<template>
  <l-tree
    ref="treeRef"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />

  <div class="buttons">
    <l-button @click="getCheckedNodes">get by node</l-button>
    <l-button @click="getCheckedKeys">get by key</l-button>
    <l-button @click="setCheckedNodes">set by node</l-button>
    <l-button @click="setCheckedKeys">set by key</l-button>
    <l-button @click="resetChecked">reset</l-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ETree } from 'eui'
import type Node from '@/packages/tree/src/model/node'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const treeRef = ref<InstanceType<typeof ETree>>()

const getCheckedNodes = () => {
  console.log(treeRef.value!.getCheckedNodes(false, false))
}
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false))
}
const setCheckedNodes = () => {
  treeRef.value!.setCheckedNodes(
    [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 9,
        label: 'Level three 1-1-1',
      },
    ] as Node[],
    false
  )
}
const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([3], false)
}
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

```

### 自定义节点类名

节点的类名支持自定义。

使用 props.class 来建立节点的类名。

```vue demo
<template>
  <div class="custom-tree-node-container">
    <l-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :props="{ customClass: customNodeClass }"
    ></l-tree>
  </div>
</template>

<script lang="ts" setup>
import type Node from '@/packages/tree/src/model/node'

interface Tree {
  id: number
  label: string
  isPenultimate?: boolean
  children?: Tree[]
}

const customNodeClass = (data: Tree, node: Node) => {
  if (data.isPenultimate) {
    return 'is-penultimate'
  }
  return null
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        isPenultimate: true,
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    isPenultimate: true,
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    isPenultimate: true,
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>


```

# 树节点过滤

树节点是可以被过滤的

调用 Tree 实例对象的 filter 方法来过滤树节点。 方法的参数就是过滤关键字。 需要注意的是，此时需要设置 filter-node-method 属性，其值为过滤函数。

```vue demo

<template>
  <l-input v-model="filterText" placeholder="Filter keyword" />

  <l-tree
    ref="treeRef"
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { ETree } from 'eui'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ETree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

```

# 手风琴模式

对于同一级的节点，每次只能展开一个

```vue demo
<template>
  <l-tree
    :data="data"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick"
  />
</template>

<script lang="ts" setup>
interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>

```

# 可拖拽节点

通过 draggable 属性可让节点变为可拖拽

```vue demo
<template>
  <l-tree
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :data="data"
    draggable
    default-expand-all
    node-key="id"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />
</template>

<script lang="ts" setup>
import type Node from '@/packages/tree/src/model/node'
import type { DragEvents } from '@/packages/tree/src/model/useDragNode'
import type { DropType } from '@/packages/tree/src/tree.type'

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node)
}
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag enter:', dropNode.label)
}
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents
) => {
  console.log('tree drag leave:', dropNode.label)
}
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag over:', dropNode.label)
}
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: DragEvents
) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType)
}
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: DragEvents
) => {
  console.log('tree drop:', dropNode.label, dropType)
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('Level three 3-1-1')
}

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
</script>

```

## API

## tree 属性

|属性 |说明 |类型 |可选值 |默认值|
|---- |----- |------ |---  |---- |
|data|展示数据|array|—|—
|empty-text|内容为空的时候展示的文本|string|—|—
|node-key|每个树节点用来作为唯一标识的属性，整棵树应该是唯一的|string|—|—
|props|配置选项，具体看下表|object|—|—
|render-after-expand|是否在第一次展开某个树节点后才渲染其子节点|boolean|—|true
|load|加载子树数据的方法，仅当 lazy 属性为true 时生效|function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)|—|—
|render-content|树节点的内容区的渲染 Function|Function(h, { node, data, store })|—|—
|highlight-current|是否高亮当前选中节点，默认值是 false。|boolean|—|false
|default-expand-all|是否默认展开所有节点|boolean|—|false
|expand-on-click-node|是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。|boolean|—|true
|check-on-click-node|是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。|boolean|—|false
|auto-expand-parent|展开子节点的时候是否自动展开父节点|boolean|—|true
|default-expanded-keys|默认展开的节点的 key 的数组|array|—|—
|show-checkbox|节点是否可被选择|boolean|—|false
|check-strictly|在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false|boolean|—|false
|default-checked-keys|默认勾选的节点的 key 的数组|array|—|—
|current-node-key|当前选中的节点|string, number|—|—
|filter-node-method|对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏|Function(value, data, node)|—|—
|accordion|是否每次只打开一个同级树节点展开|boolean|—|false
|indent|相邻级节点间的水平缩进，单位为像素|number|—|16
|icon|eui组件中的icon名字(e-icon-xxx中的xxx)|string |-|right
|lazy|是否懒加载子节点，需与 load 方法结合使用|boolean|—|false
|draggable|是否开启拖拽节点功能|boolean|—|false
|allow-drag|判断节点能否被拖拽 如果返回 false ，节点不能被拖动|Function(node)|—|—
|allow-drop|拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后|Function(draggingNode, dropNode, type)|—|—

## Props

|Props |说明 |类型 |可选值 |默认值|
|---- |----- |------ |---  |---- |
|label|指定节点标签为节点对象的某个属性值|string, function(data, node)|—|—
|children|指定子树为节点对象的某个属性值|string|—|—
|disabled|指定节点选择框是否禁用为节点对象的某个属性值|string, function(data, node)|—|—
|isLeaf|指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效|string, function(data, node)|—|—
|customClass|自定义节点类名**这里和eui-plus不同**|string, function(data, node)|—|—

## 方法

Tree 组件有以下方法，均返回当前选中的节点数组

|方法|描述|参数|
|---|----|----|
|filter|过滤所有树节点，过滤后的节点将被隐藏|接收一个参数并指定为 filter-node-method 属性的第一个参数
|updateKeyChildren|为节点设置新数据，只有当设置 node-key 属性的时候才可用|(key, data) 接收两个参数: 1. 节点的 key 2. 新数据
|getCheckedNodes|如果节点可以被选中，(show-checkbox 为 true), 本方法将返回当前选中节点的数组|(leafOnly, includeHalfChecked) 接收两个布尔类型参数: 1. 默认值为 false. 若参数为 true, 它将返回当前选中节点的子节点 2. 默认值为 false. 如果参数为 true, 返回值包含半选中节点数据
setCheckedNodes|设置目前勾选的节点，使用此方法必须提前设置 node-key 属性|要选中的节点构成的数组
getCheckedKeys|若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组|(leafOnly) 接收一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
setCheckedKeys|设置目前选中的节点，使用此方法必须设置 node-key 属性|(keys, leafOnly) 接收两个参数: 1. 一个需要被选中的多节点 key 的数组 2. 一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
|setChecked|设置节点是否被选中, 使用此方法必须设置 node-key 属性|(key/data, checked, deep) 接收三个参数: 1. 要选中的节点的 key 或者数据 2. 一个布尔类型参数表明是否选中. 3. 一个布尔类型参数表明是否递归选中子节点
|getHalfCheckedNodes|如果节点可用被选中 (show-checkbox 为 true), 它将返回当前半选中的节点组成的数组|-
|getHalfCheckedKeys|若节点可被选中(show-checkbox 为 true)，则返回目前半选中的节点的 key 所组成的数组|-
|getCurrentKey|返回当前被选中节点的数据 (如果没有则返回 null)|—
|getCurrentNode|返回当前被选中节点的数据 (如果没有则返回 null)|—
|setCurrentKey|通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key  属性|(key, shouldAutoExpandParent=true) 1. 待被选节点的 key， 如果为 null, 取消当前选中的节点 2. 是否自动展开父节点
|setCurrentNode|设置节点为选中状态，使用此方法必须设置 node-key 属性|(node, shouldAutoExpandParent=true) 1. 待被选中的节点 2. 是否展开父节点
|getNode|根据 data 或者 key 拿到 Tree 组件中的 node|(data) 节点的 data 或 key
|remove|删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性|(data) 要删除的节点的 data 或者 node 对象
|append|为 Tree 中的一个节点追加一个子节点|(data, parentNode) 1. 要追加的子节点的 data 2. 父节点的 data, key 或 node
|insertBefore|在 Tree 中给定节点前插入一个节点|(data, refNode) 1. 要增加的节点的 data 2. 参考节点的 data, key 或 node
|insertAfter|在 Tree 中给定节点后插入一个节点|(data, refNode) 1. 要增加的节点的 data 2. 参考节点的 data, key 或 node

## tree 插槽

|名称| 说明|
|---|----|
| -  | 自定义树节点的内容， 自定义树节点的内容， 参数为  { node, data } |

## tree 事件

|事件名 |说明 |参数|
|----|----|---|
|node-click|当节点被点击的时候触发|三个参数：对应于节点点击的节点对象， TreeNode 节点 属性，事件对象
|node-contextmenu|当某一节点被鼠标右键点击时会触发该事件|共四个参数，依次为：event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
|check-change|当复选框被点击的时候触发|共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
|check|点击节点复选框之后触发|共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
|current-change|当前选中节点变化时触发的事件|共两个参数，依次为：当前节点的数据，当前节点的 Node 对象
|node-expand|节点被展开时触发的事件|共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
|node-collapse|节点被关闭时触发的事件|共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
|node-drag-start|节点开始拖拽时触发的事件|共两个参数，依次为：被拖拽节点对应的 Node、event
|node-drag-enter|拖拽进入其他节点时触发的事件|共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event
|node-drag-leave|拖拽离开某个节点时触发的事件|共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event
|node-drag-over|在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）|共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event
|node-drag-end|拖拽结束时（可能未成功）触发的事件|共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event
|node-drop|拖拽成功完成时触发的事件|共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
