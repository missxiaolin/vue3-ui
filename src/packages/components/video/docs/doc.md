# Video 视频播放
适用于 Vue3 的 hls.js 播放器组件 | 并且支持 MP4/WebM/Ogg/m3u8 格式


支持快捷键操作
支持倍速播放设置
支持镜像画面设置
支持关灯模式设置
支持画中画模式播放
支持全屏/网页全屏播放
支持从固定时间开始播放
支持移动端，移动端会自动调用自带视频播放器
支持hls视频流播放，支持直播
hls播放支持清晰度切换

### 基础用法
提供了丰富了配置功能
```vue demo
<template>
  <div>
    <l-video v-bind="options" poster='https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg'/>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const options = reactive({
  width: '600px', //播放器高度
  height: '300px', //播放器高度
  color: "#409eff", //主题色
  title: '', //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false,  //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns:['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] //显示所有按钮,
})
</script>

```

### 设置播放开始时间
可以通过`props`的`speed`开启或关闭进度条功能, 并且通过 `currentTime`属性控制从60秒开始播放
通过`speed`关闭进度条拖动功能。 并且通过 `currentTime`属性控制从60秒开始播放
```vue demo
<template>
  <div>
    <l-video v-bind="options" poster='https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg'/>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const options = reactive({
  width: '500px', //播放器高度
  height: '260px', //播放器高度
  color: "#409eff", //主题色
  currentTime:60,
  speed:false, //关闭进度条拖动
  title: '', //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
})
</script>
```
### 播放控制器
还可以通过`props`的`control`属性 来控制是否显示控制器
```vue demo
<template>
  <div>
    <l-video v-bind="options" poster='https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg'/>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const options = reactive({
  width: '500px', //播放器高度
  height: '260px', //播放器高度
  color: "#409eff", //主题色
  control: false, //是否显示控制器
  title: '', //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
})
</script>

```

### 事件
```vue demo
<template>
  <div>
      <l-video 
      width="800px"
      title="钢铁侠"
      :src="options.src"
      :poster="options.poster"
      @play="onPlay"
      @pause="onPause" 
      @timeupdate="onTimeupdate" 
      @canplay="onCanplay" />
  </div>

</template>


<script setup lang="ts">
import { reactive } from 'vue';

const options = reactive({
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  poster: '', //封面
})
const onPlay = (ev) => {
  console.log('播放')
}
const onPause = (ev) => {
  console.log(ev, '暂停')
}

const onTimeupdate = (ev) => {
  console.log(ev, '时间更新')
}
const onCanplay = (ev) => {
  console.log(ev, '可以播放')
}
</script>
```


### Hls m3u8视频/直播
支持m3u8(hls)播放
```vue demo
<template>
  <div>
      <l-video 
      width="800px"
      title="冰河世纪"
      :src="options.src"
      :type="options.type"
      :autoPlay="false"
       />
  </div>

</template>
<script setup lang="ts">
import { reactive } from 'vue';
const options = reactive({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  type: 'mp4', //视频类型
})
//src: "https://static.com/big/aba/1456162994093568000", //视频源
  // type: 'm3u8', //视频类型
</script>
```

支持`video`原生所有`Attributes` video原生属性 使用方式和`props`属性使用一致

```js 
<video>标签的属性
src ：视频的属性
poster：视频封面，没有播放时显示的图片
preload：预加载
autoplay：自动播放
loop：循环播放
controls：浏览器自带的控制条
width：视频宽度
height：视频高度
html 代码

  <video id="media" src="http://www.sundxs.com/test.mp4" controls width="400px" heigt="400px"></video>  
  //audio和video都可以通过JS获取对象,JS通过id获取video和audio的对象
获取video对象

  Media = document.getElementById("media"); 
Media方法和属性：
HTMLVideoElement和HTMLAudioElement 均继承自HTMLMediaElement
Media.error; //null:正常
Media.error.code; //1.用户终止 2.网络错误 3.解码错误 4.URL无效
//网络状态 
- Media.currentSrc; //返回当前资源的URL
- Media.src = value; //返回或设置当前资源的URL
- Media.canPlayType(type); //是否能播放某种格式的资源
- Media.networkState; //0.此元素未初始化 1.正常但没有使用网络 2.正在下载数据 3.没有找到资源
- Media.load(); //重新加载src指定的资源
- Media.buffered; //返回已缓冲区域，TimeRanges
- Media.preload; //none:不预载 metadata:预载资源信息 auto:

//准备状态 
- Media.readyState;//1:HAVE_NOTHING 2:HAVE_METADATA 3.HAVE_CURRENT_DATA 4.HAVE_FUTURE_DATA 5.HAVE_ENOUGH_DATA
- Media.seeking; //是否正在seeking

//回放状态

Media.currentTime = value; //当前播放的位置，赋值可改变位置
Media.startTime; //一般为0，如果为流媒体或者不从0开始的资源，则不为0
Media.duration; //当前资源长度 流返回无限
Media.paused; //是否暂停
Media.defaultPlaybackRate = value;//默认的回放速度，可以设置
Media.playbackRate = value;//当前播放速度，设置后马上改变
Media.played; //返回已经播放的区域，TimeRanges，关于此对象见下文
Media.seekable; //返回可以seek的区域 TimeRanges
Media.ended; //是否结束
Media.autoPlay; //是否自动播放
Media.loop; //是否循环播放
Media.play(); //播放
Media.pause(); //暂停
//视频控制

Media.controls;//是否有默认控制条
Media.volume = value; //音量
Media.muted = value; //静音
TimeRanges(区域)对象
TimeRanges.length; //区域段数
TimeRanges.start(index) //第index段区域的开始位置
TimeRanges.end(index) //第index段区域的结束位置
//相关事件

  var eventTester = function(e){
     Media.addEventListener(e,function(){
         console.log((new Date()).getTime(),e)
     },false);
 }
eventTester("loadstart"); //客户端开始请求数据
eventTester("progress"); //客户端正在请求数据
eventTester("suspend"); //延迟下载
eventTester("abort"); //客户端主动终止下载（不是因为错误引起）
eventTester("loadstart"); //客户端开始请求数据
eventTester("progress"); //客户端正在请求数据
eventTester("suspend"); //延迟下载
eventTester("abort"); //客户端主动终止下载（不是因为错误引起），
eventTester("error"); //请求数据时遇到错误
eventTester("stalled"); //网速失速
eventTester("play"); //play()和autoplay开始播放时触发
eventTester("pause"); //pause()触发
eventTester("loadedmetadata"); //成功获取资源长度
eventTester("loadeddata"); //
eventTester("waiting"); //等待数据，并非错误
eventTester("playing"); //开始回放
eventTester("canplay"); //可以播放，但中途可能因为加载而暂停
eventTester("canplaythrough"); //可以播放，歌曲全部加载完毕
eventTester("seeking"); //寻找中
eventTester("seeked"); //寻找完毕
eventTester("timeupdate"); //播放时间改变
eventTester("ended"); //播放结束
eventTester("ratechange"); //播放速率改变
eventTester("durationchange"); //资源长度改变
eventTester("volumechange"); //音量改变
```

## Progress 属性


| 名称          |         说明          |  类型   |           可选值             |      默认值            |
| ------------- | :-------------------: | :-----: | :----------------: | :----------------------: |
| width         |      播放器宽度       | string  |                                                 -                                                  |                                               800px                                                |
| height        |      播放器高度       | string  |                                                 -                                                  |                                               450px                                                |
| color         |     播放器主色调      | string  |                                                 -                                                  |                                              #409eff                                               |
| src           |       视频资源        | string  |                                                 -                                                  |                                                 -                                                  |
| title         |       视频名称        | string  |                                                 -                                                  |                                                 -                                                  |
| type          |       视频类型        | string  |                                                 -                                                  |                                             video/mp4                                              |
| poster        |       视频封面        | string  |                                                 -                                                  |                                             视频第一帧                                             |
| webFullScreen |       网页全屏        | boolean |                                                 -                                                  |                                               false                                                |
| speed         |   是否支持快进快退    | boolean |                                                 -                                                  |                                                true                                                |
| currentTime   | 跳转到固定播放时间(s) | number  |                                                 -                                                  |                                                 0                                                  |
| playsinline   | ios 点击屏幕是否全屏  | boolean |                                                 -                                                  |                                               false                                                |
| muted         |         静音          | boolean |                                                 -                                                  |                                               false                                                |
| speedRate     |       倍速配置        |  array  |                                                 -                                                  |                            ["2.0", "1.0", "1.5", "1.25", "0.75", "0.5"]                            |
| autoPlay      |       自动播放        | boolean |                                                 -                                                  |                                     false,为 true 时会自动静音                                     |
| loop          |       循环播放        | boolean |                                                 -                                                  |                                               false                                                |
| mirror        |       镜像画面        | boolean |                                                 -                                                  |                                               false                                                |
| ligthOff      |       关灯模式        | boolean |                                                 -                                                  |                                               false                                                |
| volume        |       默认音量        | number  |                                                0-1                                                 |                                                0.3                                                 |
| control       |    是否显示控制器     | boolean |                                                 -                                                  |                                                true                                                |
| controlBtns   |   控制器显示的按钮    |  array  | ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] | ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] |
| preload       |        预加载         | string  |                                           meta/auto/none                                           |                                                auto                                                |

### `props`属性 `controlBtns` 按钮说明

| 名称           |       说明       |
| -------------- | :--------------: |
| audioTrack     |   音轨切换按钮   |
| quality        | 视频质量切换按钮 |
| speedRate      |   速率切换按钮   |
| volume         |       音量       |
| setting        |       设置       |
| pip            |    画中画按钮    |
| pageFullScreen |   网页全屏按钮   |
| fullScreen     |     全屏按钮     |

## Events

vue3-video-play 支持 video 原生所有事件 [video 默认事件](https://segmentfault.com/a/1190000008053507)

| 事件名称       | 说明               | 回调  |
| -------------- | ------------------ | ----- |
| mirrorChange   | 镜像翻转事件       | val   |
| loopChange     | 循环播放开关事件   | val   |
| lightOffChange | 关灯模式事件       | val   |
| loadstart      | 客户端开始请求数据 | event |
| progress       | 客户端正在请求数据 | event |
| error          | 请求数据时遇到错误 | event |
| stalled        | 网速失速           | event |
| play           | 开始播放时触发     | event |
| pause          | 暂停时触发         | event |
| loadedmetadata | 成功获取资源长度   | event |
| loadeddata     | 缓冲中             | event |
| waiting        | 等待数据，并非错误 | event |
| playing        | 开始回放           | event |
| canplay        | 暂停状态下可以播放 | event |
| canplaythrough | 可以持续播放       | event |
| timeupdate     | 更新播放时间       | event |
| ended          | 播放结束           | event |
| ratechange     | 播放速率改变       | event |
| durationchange | 资源长度改变       | event |
| volumechange   | 音量改变           | event |

## 快捷键说明

支持快捷键操作
| 键名       | 说明                          |
| ---------- | ----------------------------- |
| Space      | 暂停/播放                     |
| 方向右键 → | 单次快进 10s，长按 5 倍速播放 |
| 方向左键 ← | 快退 10s                      |
| 方向上键 ↑ | 音量+10%                      |
| 方向下键 ↓ | 音量-10%                      |
| Esc        | 退出全屏/退出网页全屏         |
| F          | 全屏/退出全屏                 |