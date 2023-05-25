# Timeline 时间线
可视化地呈现时间流信息。

### 基础用法
Timeline 可拆分成多个按照时间戳排列的活动， 时间戳是其区分于其他控件的重要特征， 使用时注意与 Steps 步骤条等区分。


```vue demo
<template>
  <l-timeline>
    <l-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </l-timeline-item>
  </l-timeline>
</template>

<script lang="ts" setup>
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
]
</script>
```


### ⾃定义节点样式
可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。
```vue demo
<template>
  <l-timeline>
    <l-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :hollow="activity.hollow"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </l-timeline-item>
  </l-timeline>
</template>

<script lang="ts" setup>

const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: 'l-shengyin',
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    icon: 'l-shengyin',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
  },
]
</script>
```

### ⾃定义标题、内容、节点样式
可根据实际场景`slot` ⾃定义节点尺⼨、颜⾊，或直接使⽤图标。
```vue demo
<template>
  <l-timeline>
    <l-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :size="activity.size"
      :icon="activity.icon"
    >
      <template #header>
      <dl class="md-custom-timeline-header">
        <dt>
          {{activity.personnel}}({{activity.port}})<i>{{activity.statusDesc}}</i>
        </dt>
        <dd>
          {{activity.timestamp}}
        </dd>
      </dl>
      </template>
      <div class="md-custom-timeline-content">
        <dl>
          <dt>审批意见:</dt>
          <dd>{{ activity.content }}</dd>
        </dl>
      </div>
      
    </l-timeline-item>
  </l-timeline>
</template>

<script lang="ts" setup>

const activities = [
  {
    content: '这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是',
    personnel: '查',
    port: '销售',
    statusDesc: '发起',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: 'l-chenggong',
  },
  {
    content: '这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是',
    personnel: '查',
    port: '销售',
    statusDesc: '发起',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: 'l-chenggong',
  },
  {
    content: '这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是',
    personnel: '查',
    port: '销售',
    statusDesc: '发起',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: 'l-chenggong',
  },
  {
    content: '这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是这是一条极限审批意见这是一条审批意见这是',
    personnel: '查',
    port: '销售',
    statusDesc: '发起',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: 'l-chenggong',
  }
]
</script>
```

### ⾃定义时间戳
当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。
```vue demo
<template>
  <l-timeline>
    <l-timeline-item timestamp="2018/4/12" placement="top">
      <l-panel>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </l-panel>
    </l-timeline-item>
    <l-timeline-item timestamp="2018/4/3" placement="top">
      <l-panel>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </l-panel>
    </l-timeline-item>
    <l-timeline-item timestamp="2018/4/2" placement="top">
      <l-panel>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </l-panel>
    </l-timeline-item>
  </l-timeline>
</template>

```

### 垂直居中
垂直居中样式的 `Timeline-Item`
```vue demo
<template>
  <l-timeline>
    <l-timeline-item center timestamp="2018/4/12" placement="top">
      <l-panel>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </l-panel>
    </l-timeline-item>
    <l-timeline-item timestamp="2018/4/3" placement="top">
      <l-panel>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </l-panel>
    </l-timeline-item>
    <l-timeline-item center timestamp="2018/4/2" placement="top">
      Event start
    </l-timeline-item>
    <l-timeline-item timestamp="2018/4/2" placement="top">
      Event end
    </l-timeline-item>
  </l-timeline>
</template>
```

## Timeline 插槽
| 插槽名| 	说明| 	子标签| 
| ----| ------| ------| 
| —	| 时间戳| 	Timeline-Item| 
## Timeline-Item 属性
| 属性| 	说明	| 类型| 	可选值| 	默认值| 
| ----| -----| ----| ----| -----| 
| timestamp	| 时间戳| 	string| 	—	| —| 
| hide-timestamp	| 是否隐藏时间戳	| boolean	| —	| false| 
| center	| 是否垂直居中	| boolean	| —	| false| 
| placement	| 时间戳位置	| string| 	top / bottom| 	bottom| 
| type| 节点类型	| string	| primary / success / warning / danger / info| 	—| 
| color| 	节点颜色	| string| 	hsl / hsv / hex / rgb	| —| 
| size| 	节点尺寸	| string	normal / large| 	normal| 
| icon| 	自定义图标| 	string / Component	| —| 	—| 
| hollow| 	是否空心点	| boolean	| —	| false| 
## Timeline-Item 插槽
| 插槽名	| 说明| 
| —	| Timeline-Item 的内容| 
| dot	| 自定义节点| 