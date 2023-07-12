# Select 筛选框

## 基础用法

```vue demo
<template>
<l-row :cols="3">
    <l-col>
        <l-select v-model="value" placeholder="Select">
            <l-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </l-option>
        </l-select>
    </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

let options =  ref([])
for(let i = 1; i <= 10; i++) {
  options.value.push({
    value: `Option${i}`,
    label: `Option${i}`,
  })
}
</script>

```


### 基础多选
适用性较广的基础多选，用 `Tag` 展示已选项

为 `e-select` 设置 `multiple` 属性即可启用多选， 此时 `v-model` 的值为当前选中值所组成的数组。 默认情况下选中值会以 `Tag` 的形式展现， 你也可以设置 `collapse-tags` 属性将它们合并为一段文字。
```vue demo
<template>
<l-row :cols="3">
    <l-col>
      <l-select v-model="value1" multiple placeholder="Select">
        <l-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </l-option>
      </l-select>
</l-col>
  <l-col>
    <l-select
      v-model="value2"
      multiple
      collapse-tags
      style="margin-left: 20px"
      placeholder="Select"
    >
      <l-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </l-option>
    </l-select>
  </l-col>
</l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref([])
const value2 = ref([])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
```

### 自定义模板
你可以自定义单个选项怎么被渲染

将自定义的 HTML 模板插入 `e-option` 的 `slot` 中即可。
```vue demo
<template>
<l-row :cols="3">
    <l-col>
      <l-select v-model="value" placeholder="Select">
        <l-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
          <span
            style="
              float: right;
              color: var(--e-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.value }}</span
          >
        </l-option>
      </l-select>
    </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
]
</script>

```

### 将选项进行分组
你可以为选项进行分组来区分不同的选项

使用 `e-option-group` 对备选项进行分组，它的 `label` 属性为分组名

```vue demo
<template>
<l-row :cols="3">
    <l-col>
      <l-select v-model="value" placeholder="Select">
        <l-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <l-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </l-option>
        </l-option-group>
      </l-select>
  </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
]
</script>
```

### 筛选选项
可以利用筛选功能快速查找选项

为 `e-select` 添加 `filterable` 属性即可启用筛选功能。 默认情况下，`Select` 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。
```vue demo
<template>
<l-row :cols="3">
    <l-col>
      <l-select v-model="value" filterable placeholder="Select">
        <l-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </l-option>
      </l-select>
  </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
```

### 远程搜索
通过输入关键字在服务器上来搜索数据

为了启用远程搜索，需要将 `filterable` 和`remote` 设置为 `true`，同时传入一个 `remote-method`。 `remote-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `e-option` 是通过 `v-for` 指令渲染出来的，此时需要为 `e-option` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

```vue demo
<template>
<l-row :cols="3">
    <l-col>
      <l-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        :loading="loading"
        :scrollLoad="true"
        @load="handleLoad"
        :finished="loadFinished"
        finishedText="没有更多了"
      >
        <l-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </l-option>
      </l-select>
  </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

interface ListItem {
  value: string
  label: string
}

const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)
const loadFinished = ref(false)

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    }, 200)
  } else {
    options.value = []
  }
}
const handleLoad = (done: Function) => {
  setTimeout(() => {
    loadFinished.value = true
    done()
  }, 1000)
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]
</script>
```

### 创建新的选项
可以创建并选中选项中不存在的条目

通过使用 `allow-create` 属性，用户可以通过输入框创建新项目。 为了使 `allow-create` 正确的工作， `filterable` 的值必须为 `true`. 本例还使用了 `default-first-option` 属性， 在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。
```vue demo
<template>
<l-row :cols="3">
    <l-col>
      <l-select
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="Choose tags for your article"
      >
        <l-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </l-option>
      </l-select>
  </l-col>
  </l-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([])
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
]
</script>
```



### Select 属性
|属性	| 说明	| 类型	| 可选值| 	默认值| 
| ----- | -----| ----| ----| ----| 
| model-value / v-model	| 选中项绑定值	| string / number / boolean / object| 	—| 	—| 
| multiple| 	是否多选	| boolean	| —	| false| 
| disabled	| 是否禁用| 	boolean| 	—| 	false| 
| value-key| 	作为 value 唯一标识的键名，绑定值为对象类型时必填| 	string| 	—	| value| 
| size| 	输入框尺寸| 	string| 	large/default/small| 	default| 
| clearable	| 是否可以清空选项	| boolean| 	—	| false| 
| collapse-tags	| 多选时是否将选中值按文字的形式展示| 	boolean	| —	| false| 
| multiple-limit| 	多选时用户最多可以选择的项目数， 为 0 则不限制| 	number| 	—	| 0| 
| name| 	多选框的输入框的原生 name 属性| 	string	| —	| —| 
| autocomplete	| 多选框的输入框的原生 autocomplete 属性	| string	| —	| off| 
| placeholder	| 占位符| 	string| 	—| 	Select| 
| filterable	| 是否可以筛选| 	boolean| 	—	| false| 
| allow-create| 	是否允许用户创建新条目， 当 filterable 必须为 true 时才会生效。	| boolean	| —	| false| 
| filter-method	| 自定义筛选方法| 	function| 	—| 	—| 
| remote	| 其中的选项是否从服务器中远程加载| 	boolean| 	—	| false| 
| remote-method	| 远程搜索对应的函数| 	function| 	—	| —| 
| loading	| 是否正在从远程获取数据| 	boolean| 	—	| false| 
| loading-text| 	搜索内容加载中的文字| 	string| 	—	| Loading| 
| no-match-text	| 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置	| string	| —	| No matching data| 
| no-data-text| 	选项为空时显示的文字，也可以使用 empty 插槽设置	| string	| —	| No data| 
| popper-class	| Select | 下拉框的类名	| string| 	—| 	—| 
| reserve-keyword	| 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词	| boolean| 	—| 	true| 
| default-first-option	| 在输入框按下回车，选择第一个匹配项。 需配合 filterable 或 remote 使用	| boolean| 	-	| false| 
| popper-append-to-body(deprecated)	| 是否将弹出框插入至 body 元素。 在弹出框的定位出现问题时，可将该属性设置为  false	| boolean	| -	| true| 
| teleported| 	是否将 Select 的下拉菜单teleport至 body	| boolean	| true / false| 	true| 
| automatic-dropdown| 	对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单	| boolean| 	-| 	false| 
| clear-icon| 	自定义清除图标组件| 	string / Component| 	—	| CircleClose| 
| fit-input-width| 	下拉框的宽度是否与输入框相同	| boolean| 	—	| false| 
| suffix-icon	| 自定义后缀图标组件| 	string / Component| 	—	| ArrowUp| 
| tag-type| 	标签类型| 	string	| success/info/warning/danger| 	info| 
| scrollLoad | 是否开启下拉加载 | boolean | - | false |
| finished | 下拉加载完成（同e-scroll） | boolean | - | false |
| finishedText | 下拉加载完成的底部提示语（痛e-scroll）| string | - | '你已经看到我的底线啦~' |

### Select 事件#
| 事件名| 	说明| 	回调参数| 
| ---| ---| ----| 
| change| 	选中值发生变化时触发| 	val， 目前的选中值| 
| visible-change| 	下拉框出现/隐藏时触发	| val，出现则为 true，隐藏则为 false| 
| remove-tag| 	多选模式下移除tag时触发	| val，移除的tag值| 
| clear	| 可清空的单选模式下用户点击清空按钮时触发	| —| 
| blur| 	当 input 失去焦点时触发| 	(event: Event)| 
| focus	| 当 input 获得焦点时触发| 	(event: Event)| 
| load  | 当下拉框滚动到底部时触发 | - |

### Select 插槽
| 插槽名| 	说明| 	子标签| 
| ----| ----| ----| 
| —	| Option 组件列表| 	Option Group / Option| 
| prefix| 	Select 组件头部内容| 	—| 
| empty	| 无选项时的列表| 	—| 

### Option Group 属性
| 属性	| 说明	| 类型	| 可选值| 	默认值| 
| ----| ----| -----| ----| ----| 
| label| 	分组的组名	| string	| —	| —| 
| disabled	| 是否将该分组下所有选项置为禁用	| boolean	| —	| false| 

### Button Group 插槽
| 插槽名	| 说明| 	子标签| 
| ----| ----| -----| 
| -	| 自定义默认内容| 	Option| 

### Option 属性
| 属性| 	说明| 	类型| 	可选值| 	默认值| 
| ----| -----| -----| -----| -----| 
| value	| 选项的值	| string / number / boolean / object| 	—| 	—| 
| label	| 选项的标签，若不设置则默认与value相同	| string/number| 	—| 	—| 
| disabled	| 是否禁用该选项| 	boolean	| —| 	false| 

### Option 插槽
| 插槽名	| 说明| 
| ---| ----| 
| —	| 默认插槽| 
#### Select 方法
| 方法名	| 说明	| 参数| 
| ----| ----| ----| 
| focus| 	使选择器的输入框获取焦点| 	-| 
| blur	| 使选择器的输入框失去焦点，并隐藏下拉框| 	-| 
| load | 下拉框拉到底部，仅scrollLoad为true时触发 | done: Function，结束加载状态 |