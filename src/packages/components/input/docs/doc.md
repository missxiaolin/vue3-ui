# Input 输入框

通过鼠标或键盘输入字符
> Input 为受控组件，它 总会显示 Vue 绑定值。不支持 `v-model` 修饰符。

### 基础用法

```vue demo
<template>
  <l-row :cols="3">
    <l-col>
      <l-input v-model="input" placeholder="请输入文本"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      input: ref('')
    };
  }
});
</script>
```

### 数字类型
使用 `decimals-digit` 控制小数点后位数，
```vue demo
<template>
  <l-row :cols="3" form>
    <l-col label="小数点">
      <l-input v-model="input" type="number" clearable decimals-digit='6' placeholder="请输入数字"></l-input>
    </l-col>
    <l-col label="整数">
      <l-input v-model="integerVal" type="number" clearable maxlength="2" integer placeholder="最多输入2位数字"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      input: ref(''),
      integerVal: ref('')
    };
  }
});
</script>
```

### 密码类型的输入框
使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

```vue demo
<template>
  <l-row :cols="3">
    <l-col>
      <l-input v-model="input" type="password" show-password placeholder="请输入密码"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      input: ref('')
    };
  }
});
</script>
```

### 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

```vue demo
<template>
  <l-row :cols="3">
    <l-col>
      <l-input v-model="value" disabled placeholder="please input"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      value: ref('')
    };
  }
});
</script>
```

### 一键清空、尺寸、图标

通过 `clearable` 属性即可得到一个可清空的输入框

```vue demo
<template>
  <l-row :cols="4">
    <l-col>
      <l-input v-model="value" clearable placeholder="please input" size="large"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="medium" placeholder="please input"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="small" placeholder="please input"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="mini" placeholder="please input"></l-input>
    </l-col>
  </l-row>
  <l-row :cols="4">
    <l-col>
      <l-input v-model="value" clearable placeholder="please input" suffix-icon="e-icon-search" size="large"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="medium" placeholder="please input" suffix-icon="e-icon-search"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="small" placeholder="please input" suffix-icon="e-icon-search"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="mini" placeholder="please input" suffix-icon="e-icon-search"></l-input>
    </l-col>
  </l-row>

  <l-row :cols="4">
    <l-col>
      <l-input v-model="value" clearable placeholder="please input" prefix-icon="e-icon-search" size="large"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="medium" placeholder="please input" prefix-icon="e-icon-search"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="small" placeholder="please input" prefix-icon="e-icon-search"></l-input>
    </l-col>
    <l-col>
      <l-input v-model="value" clearable size="mini" placeholder="please input" prefix-icon="e-icon-search"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      value: ref('')
    };
  }
});
</script>
```

## 多行文本
用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 更改 `input` 到原生 `textarea`。

文本域高度可通过 `rows` 属性控制
```vue demo
<template>
  <l-input
    v-model="textarea"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const textarea = ref('')
</script>
```

## 可自适应文本高度的文本域
设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。
```vue demo
<template>
  <l-input
    v-model="textarea1"
    autosize
    type="textarea"
    placeholder="Please input"
  />
  <div style="margin: 20px 0"></div>
  <l-input
    v-model="textarea2"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input"
  >
  </l-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const textarea1 = ref('')
const textarea2 = ref('')
</script>
```

## 复合型输入框
添加前缀或后缀元素，通常是标签或按钮。

可通过 `slot` 来指定在 `input` 中前置或者后置内容。可以通过`prepend-style`,`append-style`设置自定义样式。
```vue demo
<template>
  <l-row :cols="1">
    <l-col>
      <l-input v-model="input1" placeholder="Please input">
        <template #prepend>Http://</template>
      </l-input>
    </l-col>
    <l-col>
      <l-input v-model="input2" placeholder="Please input">
        <template #append>.com</template>
      </l-input>
    </l-col>
    <l-col>
      
    </l-col>
    <l-col>
      
    </l-col>
  </l-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
</script>
```

### 标题吸顶

通过 `label` 属性设置可吸顶标题

```vue demo
<template>
  <l-row :cols="3">
    <l-col>
      <l-input label="我是标题" v-model="value" placeholder="please input"></l-input>
    </l-col>
    <l-col>
      <l-input label="我是标题" v-model="value1" clearable placeholder="please input"></l-input>
    </l-col>
  </l-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent ({
  setup() {
    return {
      value: ref(''),
      value1: ref('我是输入内容')
    };
  }
});
</script>
```

### 输入长度限制
使用 `maxlength` 和 `minlength` 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用JavaScript字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` prop可以限制输入值的长度。 允许你通过设置 `show-word-limit` 到 `true` 来显示剩余字数。
```vue demo
<template>
  <l-input
    v-model="text"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    type="text"
  >
  </l-input>
  <div style="margin: 20px 0"></div>
  <l-input
    v-model="textarea"
    maxlength="30"
    placeholder="Please input"
    show-word-limit
    type="textarea"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')
</script>
```


### Input 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|modelValue / v-model	| 绑定值	| string / number	| - |	- |
|type	| 类型	| string	| text，textarea, number 和其他原生 input 的 type 值 |	text |
|decimals-digit | 仅在`type=number`有效， 可输入小数位数 | string / number	| - |	2 |
|maxlength	|最大输入长度。当`type=number`需配合`integer`才生效|string / number|	—	|—|
|minlength	|原生属性，最小输入长度	|number	|—	|—|
|integer | 仅支持输入整数， 仅在`type=number`有效，并支持`maxlength`配置最大位数 |string / boolean|	—	|—|
|show-word-limit|	是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效|	boolean	|—|	false|
|placeholder	| 输入框占位文本	| string	| - |	- |
|clearable	| 是否可清空	| boolean	| - |	fasle |
|disabled	| 是否禁用	| boolean	| - |	false |
|label	| 输入框关联的 label 文字, 获取焦点后可吸顶	| string	| - |	- |
|show-password	| 是否显示切换密码图标 |	boolean |	—	 |false|
| size	| 输入框尺寸，只在 type !="textarea" 时有效 |	string |		large / default / meduim / small / mini |	— |
|prefix-icon	|自定义前缀图标|	string / Component|	—	|—|
|suffix-icon|	自定义后缀图标|	string / Component|	—	|—|
|rows	|输入框行数，只对 type="textarea" 有效|	number|	—|	2|
|readonly|	原生属性，是否只读|	boolean|	—|	false|
|autosize	|textarea高度是否自适应，只在 type="textarea" 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }|	boolean / object	|—|	false|
|autocomplete|	原生属性，自动补全|	string|	—	|off|
|name|	原生属性	|string	|—	|—|
|max|	原生属性，设置最大值|	—	|—|	—|
|min|	原生属性，设置最小值	|—|	—	|—|
|step	|原生属性，设置输入字段的合法数字间隔	|—	|—|	—|
|resize|	控制是否能被用户缩放|	string|	none / both / horizontal / vertical	|—|
|autofocus|	原生属性，自动获取焦点|	boolean	|—	|false|
|form	|原生属性	|string	|—	|—|
|label|	输入框关联的 |label 文字	|string|	—|	—|
|tabindex	|输入框的 tabindex|	string / number	|-|	-|
|validate-event	|输入时是否触发表单的校验	|boolean	|-|	true|
|input-style|	input 元素或 textarea 元素的 style	|string / object	|-|	{}|
|prepend-style|	输入框前置内容元素的 style	|string / object	|-|	{}|
|append-style|	输入框后置内容元素的 style	|string / object	|-|	{}|


## Input 插槽
|名称|	说明|
|---|----|
|prefix	|输入框头部内容，只对 type="text" 有效|
|suffix	|输入框尾部内容，只对 type="text" 有效|
|prepend	|输入框前置内容，只对 type="text" 有效|
|append	|输入框后置内容，只对 type="text" 有效|


## Input 事件
|事件名	|说明	|参数|
|------|----|----|
|blur	|在 Input 失去焦点时触发	|(event: Event)|
|focus|	在 Input 获得焦点时触发	|(event: Event)|
|change	|仅在输入框失去焦点或用户按下回车时触发	|(value: string | number)|
|input	|在 Input 值改变时触发	|(value: string | number)|
|clear	|在点击由 clearable 属性生成的清空按钮时触发|	—|


## Input 方法
|方法	|说明	|参数|
|---|----|----|
|focus|	使 input 获取焦点|	—|
|blur	|使 input 失去焦点|	—|
|select	|选中 input 中的文字|	—|


## Autocomplete 属性
|属性	|说明	|类型	|可选值	|默认值|
|-----|-----|----|-----|-----|
|placeholder	|占位文本	|string	|—	|—|
|clearable	|是否可清空|	boolean	|—|	false|
|disabled	|是否禁用	|boolean	|—|	false|
|value-key|	输入建议对象中用于显示的键名|	string	|—	|value|
|icon|	图标组件|	string / Component|	—	|—|
|model-value / v-model|	选中项绑定值	|string	|—	|—|
|debounce	|获取输入建议的防抖延时	|number	|—	|300|
|placement	|菜单弹出位置	|string	|top / top-start / top-end / bottom / bottom-start / bottom-end	|bottom-start|
|fetch-suggestions|	获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[])  来返回它|	Function(queryString, callback)	|—|	—|
|popper-class|	Autocomplete |下拉列表的类名	|string|	—|	—|
|trigger-on-focus	|是否在输入框 focus 时显示建议列表|	boolean	|—	|true|
|name	|原生属性 name 属性	|string	|—	|—|
|select-when-unmatched	|在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件|	boolean	|—|	false|
|label|	输入框关联的 label 文字	|string	|—|	—|
|prefix-icon|	输入框头部图标	|string / Component	|—|	—|
|suffix-icon	|输入框尾部图标	|string / Component	|—|	—|
|hide-loading|	是否隐藏远程加载时的加载图标|	boolean	|—|	false|
|popper-append-to-body(deprecated)|	是否将下拉列表插入至 body 元素。 在下拉列表的定位出现问题时，可将该属性设置为 false	|boolean	|-	|false|
|teleported	|whether select dropdown is teleported to the body	|boolean|	true / false	|true|
|highlight-first-item	|whether to highlight first item in remote search suggestions by default	|boolean	|—	|false|
## Autocomplete 插槽
|名称	|说明|
|---|----|
|prefix	|输入框头部内容|
|suffix	|输入框尾部内容|
|prepend|	输入框前置内容|
|append	|输入框后置内容|
## Autocomplete 作用域插槽
|名称	|说明|
|---|----|
|—	|自定义输入建议的内容。 自定义标签，参数为|

## Autocomplete 事件
|事件名	|说明	|参数|
|----|----|---|
|select	|点击选中建议项时触发	|选中的建议项|
|change	|在 Input 值改变时触发|	(value: string | number)|
## Autocomplete 方法
|方法名	|说明	|参数|
|----|----|----|
|focus	|使 input 获取焦点|	—|