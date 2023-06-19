<template>
  <div
    ref="refPlayerWrap"
    id="refPlayerWrap"
    class="l-player-wrap"
    @mousemove="mouseMovewWarp"
    :class="{
      'web-full-screen': state.webFullScreen,
      'is-lightoff': state.lightOff,
      'l-player-wrap-hover': state.playBtnState == 'play' || state.isVideoHovering
    }"
    :style="{
      '--l-video-width': width,
      '--l-video-height': height
    }"
  >
    <!-- 如果是移动端并且支持倍速 controls=true 否则为flase -->
    <div class="l-player-video" id="dPlayerVideo">
      <video
        ref="refeVideo"
        class="l-player-video-main"
        id="dPlayerVideoMain"
        :controls="isMobile && state.speed ? true : false"
        :class="{ 'video-mirror': state.mirror }"
        :webkit-playsinline="props.playsinline"
        :playsinline="props.playsinline"
        v-bind="videoEvents"
        :volume="state.volume"
        :muted="state.muted"
        :loop="state.loop"
        :preload="preload"
        width="100%"
        height="100%"
        :src="props.src"
        :poster="props.poster"
        >您的浏览器不支持Video标签。</video
      >
    </div>
    <!-- 缓冲动画 -->
    <!-- <l-waitingloading text="正在缓冲..." v-show="state.waitingLoading" /> -->

    <transition name="l-fadl-in">
      <div class="l-player-lightoff" v-show="state.lightOff"></div>
    </transition>
    <!-- 全屏模式&&鼠标滑过 顶部显示的内容 -->
    <l-video-player-top :title="props.title" v-if="state.fullScreen"></l-video-player-top>
    <!-- 状态栏 移动端不显示-->
    <div class="l-player-state" v-if="!isMobile">
      <transition name="l-scall-out">
        <!-- 播放按钮 -->
        <div class="l-play-btn" v-show="state.playBtnState == 'play'">
          <l-icon icon="l-bofang" :size="40"></l-icon>
        </div>
      </transition>
      <!-- 操作信息通知 -->
      <l-video-status :state="state"></l-video-status>
    </div>
    <!-- 移动端不显示 -->
    <input
      v-if="!isMobile"
      type="input"
      readonly="readonly"
      ref="refInput"
      @dblclick="toggleFullScreenHandle"
      @keyup.f="toggleFullScreenHandle"
      @keyup.esc="state.webFullScreen = false"
      @click="togglePlay"
      @keydown.space="togglePlay"
      @keyup="keypress"
      @keydown.arrow-left="keydownLeft"
      @keydown.arrow-up.arrow-down="volumeKeydown"
      @keydown="keypress"
      class="l-player-input"
      maxlength="0"
    />
    <!-- 预加载动画 -->
    <l-video-loading :loadType="state.loadStateType" />
    <l-contextmenu />
    <!-- PC端播放按钮控制器  移动端调用自带控制器-->
    <div class="l-player-control" ref="refPlayerControl" v-if="!isMobile && state.control">
      <div class="l-control-progress">
        <l-video-slider
          class="l-progress-bar"
          @onMousemove="onProgressMove"
          @change="progressBarChange"
          :disabled="!state.speed"
          :hoverText="state.progressCursorTime"
          v-model="state.playProgress"
          :preload="state.preloadBar"
        ></l-video-slider>
      </div>

      <div class="l-control-tool" @click="inputFocusHandle">
        <div class="l-tool-bar">
          <div class="l-tool-item" @click="togglePlay">
            <l-icon size="20" :icon="`l-${state.playBtnState}`"></l-icon>
          </div>
          <div class="l-tool-item l-tool-time audioTrack-btn" v-if="props.controlBtns.includes('audioTrack')">
            <span>{{ state.currentTime }}</span>
            <span style="margin: 0 3px">/</span>
            <span class="total-time">{{ state.totalTime }}</span>
          </div>
        </div>
        <div class="l-tool-bar">
          <!-- 清晰度 -->
          <div
            class="l-tool-item quality-btn"
            v-if="state.qualityLevels.length && props.controlBtns.includes('quality')"
          >
            {{ state.qualityLevels.length && (state.qualityLevels[state.currentLevel] || {}).height }}P
            <div class="l-tool-item-main">
              <ul class="speed-main" style="text-align: center">
                <li
                  :class="{ 'speed-active': state.currentLevel == index }"
                  @click="qualityLevelsHandle(row, index)"
                  v-for="(row, index) of state.qualityLevels"
                  :key="row"
                  >{{ row.height }}P</li
                >
                <!-- <li @click="qualityLevelsHandle({}, -1)">自动</li> -->
              </ul>
            </div>
          </div>
          <!-- 倍速播放 -->
          <div class="l-tool-item speedRatl-btn" v-if="props.controlBtns.includes('speedRate')">
            {{ state.speedActive == '1.0' ? '倍速' : state.speedActive + 'x' }}
            <div class="l-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': state.speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of state.speedRate"
                  :key="row"
                  >{{ row }}x</li
                >
              </ul>
            </div>
          </div>
          <!-- 音量 -->
          <div class="l-tool-item voluml-btn" v-if="props.controlBtns.includes('volume')">
            <div class="l-tool-item-main voluml-box" style="width: 52px">
              <div class="voluml-main" :class="{ 'is-muted': state.muted }">
                <span class="voluml-text-size">{{ state.muted ? 0 : ~~(state.volume * 100) }}%</span>
                <!-- @change 如果修改音量则取消静音 -->
                <l-video-slider
                  @change="state.muted = false"
                  :hover="false"
                  size="5px"
                  :vertical="true"
                  v-model="state.volume"
                ></l-video-slider>
              </div>
            </div>
            <span @click="mutedHandler" style="display: flex">
              <l-icon
                size="20"
                :icon="`${
                  state.volume == 0 || state.muted
                    ? 'l-jingyin'
                    : state.volume > 0.5
                    ? 'l-yinliang2'
                    : 'l-yinliang1'
                }`"
              ></l-icon>
            </span>
          </div>
          <!-- 设置 -->
          <div class="l-tool-item setting-btn" v-if="props.controlBtns.includes('setting')">
            <l-icon size="20" class="rotateHover" icon="l-shezhi"></l-icon>
            <div class="l-tool-item-main">
              <ul class="speed-main">
                <li>
                  镜像画面
                  <l-switch @change="mirrorChange" inactivl-color="#757575" v-model="state.mirror" />
                </li>
                <li>
                  循环播放
                  <l-switch @change="loopChange" inactivl-color="#757575" v-model="state.loop" />
                </li>
                <li>
                  关灯模式
                  <l-switch @change="lightOffChange" inactivl-color="#757575" v-model="state.lightOff" />
                </li>
              </ul>
            </div>
          </div>
          <!-- 画中画 -->
          <div
            class="l-tool-item pip-btn"
            v-if="props.controlBtns.includes('pip')"
            @click="requestPictureInPictureHandle"
          >
            <l-icon size="20" icon="l-huazhonghua"></l-icon>
            <div class="l-tool-item-main">画中画</div>
          </div>
          <!-- 网页全屏 -->
          <div
            class="l-tool-item pip-btn"
            v-if="props.controlBtns.includes('pageFullScreen')"
            @click="state.webFullScreen = !state.webFullScreen"
          >
            <l-icon size="20" icon="l-wangyequanping"></l-icon>
            <div class="l-tool-item-main">网页全屏</div>
          </div>
          <!-- 全屏 -->
          <div
            class="l-tool-item fullScreen-btn"
            v-if="props.controlBtns.includes('fullScreen')"
            @click="toggleFullScreenHandle"
          >
            <div class="l-tool-item-main">全屏</div>
            <l-icon size="20" icon="l-quanping"></l-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, Ref, onMounted, useAttrs, watch, nextTick } from 'vue';
import { debounce } from 'lodash';
import Hls from 'hls.js';
import { Icon } from '../../../components/icon/index';
import VideoPlayerTop from './components/video-player-top.vue';
import VideoStatus from './components/video-status.vue'; //倍速播放状态

import { Switch } from '../../../components/switch';
import VideoLoading from './components/video-loading.vue'; //loading
import VideoSlider from './components/video-slider.vue'; // slider
import Contextmenu from './components/video-context-menu.vue'; // slider
import {
  hexToRgba,
  timeFormat,
  requestPictureInPicture,
  toggleFullScreen,
  isMobile,
  firstUpperCase
} from './utils/util';
import { videoEmits, defineProps } from './video';
import createComponent from '../../../utils/create';
const { create } = createComponent('Video');

export default create({
  components: {
    [Icon.name]: Icon,
    [Contextmenu.name]: Contextmenu,
    [VideoSlider.name]: VideoSlider,
    [Switch.name]: Switch,
    [VideoStatus.name]: VideoStatus,
    [VideoPlayerTop.name]: VideoPlayerTop,
    [VideoLoading.name]: VideoLoading
  },
  props: defineProps,
  emits: videoEmits,
  setup(props, { attrs, slots, emit, expose }) {
    const refPlayerWrap = ref(null); //wrap
    const refeVideo = ref(null); // 视频播放器
    const refPlayerControl = ref(null); //播放器控制器
    const refInput = ref(null); //快捷键操作
    let HlsV = ref<any>(null); // hls 解码
    const state = reactive<any>({
      eVideo: null,
      ...props, //如果有自定义配置就会替换默认配置
      muted: props.muted,
      playBtnState: props.autoPlay ? 'pause' : 'play', // 播放按钮状态
      loadStateType: 'loadstart', // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
      fullScreen: false,
      handleType: '', //当前操作类型
      //当前播放时间
      currentTime: '00:00:00',
      // 当前缓冲进度
      preloadBar: 0,
      //总时长
      totalTime: '00:00:00',
      isVideoHovering: true,
      speedActive: '1.0', //倍速
      playProgress: 0, //播放进度
      isMultiplesPlay: false, //是否倍速播放
      longPressTimeout: null,
      progressCursorTime: '00:00:00', //进度条光标时间
      qualityLevels: [], //分辨率数组
      currentLevel: 0 //首选分辨率
    });
    const compose =
      (...args) =>
      (value) =>
        args.reverse().reduce((acc, fn) => fn(acc), value);

    // 收集video事件
    const videoEvents = videoEmits.reduce((events: any, emitEvent: any): any => {
      let name = `on${firstUpperCase(emitEvent)}`;
      events[name] = (ev) => {
        state.loadStateType = emitEvent;
        emit(emitEvent, ev);
      };

      return events;
    }, {});
    // 可以播放
    videoEvents['onCanplay'] = compose(videoEvents['onCanplay'], () => {
      if (state.playBtnState != 'play') {
        //如果是自动播放 则显示暂停按钮
        state.eVideo?.play?.();
      }
      if (state.autoPlay) {
        //如果是自动播放 则显示暂停按钮
        state.eVideo?.play?.();
        state.playBtnState = 'pause';
      }
    });
    // 播放结束// 合并函数
    videoEvents['onEnded'] = compose(videoEvents['onEnded'], () => {
      state.playBtnState = 'replay'; //此时的控制按钮应该显示重新播放
    });

    // 资源长度改变
    videoEvents['onDurationchange'] = (ev) => {
      emit('durationchange', ev);
      if (props.currentTime != 0) {
        state.eVideo.currentTime = props.currentTime;
      }

      //更新当前时长的所有状态
      videoEvents.onTimeupdate(ev);
    };

    // 缓冲下载中
    videoEvents['onProgress'] = (ev) => {
      // console.log('缓冲中...');
      emit('progress', ev);
      let duration = ev.target.duration; // 媒体总长
      let length = ev.target.buffered;
      let end = ev.target.buffered.length && ev.target.buffered.end(length - 1);
      state.preloadBar = end / duration; //缓冲比例
    };

    // 当前播放进度
    videoEvents['onTimeupdate'] = (ev) => {
      emit('timeupdate', ev);
      let duration = ev.duration || ev.target.duration || 0; // 媒体总长
      let currentTime = ev.currentTime || ev.target.currentTime; // 当前媒体播放长度
      state.playProgress = currentTime / duration; //播放进度比例
      state.currentTime = timeFormat(currentTime);
      state.totalTime = timeFormat(duration);
    };
    // error
    videoEvents['onError'] = compose(videoEvents['onError'], () => {
      state.playBtnState = 'replay'; //此时的控制按钮应该显示重新播放
    });

    for (let emit in attrs) {
      videoEvents[emit] = attrs[emit];
    }

    // 把颜色格式化为rgb格式
    const hexToRgbaColor = hexToRgba(state.color);
    // 清空当前操作类型
    const clearHandleType = debounce(() => {
      state.handleType = '';
    }, 500);
    // 音量 +++ --
    const volumeKeydown = (ev) => {
      ev.preventDefault();
      if (ev.code == 'ArrowUp') {
        state.volume = state.volume + 0.1 > 1 ? 1 : state.volume + 0.1;
      } else {
        state.volume = state.volume - 0.1 < 0 ? 0 : state.volume - 0.1;
      }
      state.muted = false;
      state.handleType = 'volume'; //操作类型  音量
      clearHandleType(); //清空 操作类型
    };
    const keydownLeft = (ev) => {
      if (!props.speed) return; // 如果不支持快进快退s
      state.eVideo.currentTime = state.eVideo.currentTime < 10 ? 0.1 : state.eVideo.currentTime - 10;
      videoEvents.onTimeupdate(state.eVideo);
      playHandle();
    };
    const keypress = (ev) => {
      ev.preventDefault();
      let pressType = ev.type;
      if (ev.key == 'ArrowRight') {
        playHandle();
        if (pressType == 'keyup') {
          clearTimeout(state.longPressTimeout);
          // 如果不支持快进快退 如果关闭快进快退必须在没有长按倍速播放的情况下
          if (!props.speed && !state.longPressTimeout) return;
          if (state.isMultiplesPlay) {
            //如果倍速播放中
            state.eVideo.playbackRate = state.speedActive;
            state.isMultiplesPlay = false;
          } else {
            // 进度加10s
            state.eVideo.currentTime = state.eVideo.currentTime + 10;
            videoEvents.onTimeupdate(state.eVideo);
          }
          // 如果长按5倍速播放
        } else if (pressType == 'keydown') {
          if (!props.speed) return; // 如果不支持快进快退 也不能支持长按倍速播放
          if (state.isMultiplesPlay) {
            clearTimeout(state.longPressTimeout);
          }
          state.longPressTimeout = setTimeout(() => {
            state.isMultiplesPlay = true;
            state.eVideo.playbackRate = 5;
            state.handleType = 'playbackRate'; //操作类型 倍速播放
            clearHandleType(); //清空 操作类型
          }, 500);
        }
      }
    };
    // 聚焦到播放器
    const inputFocusHandle = () => {
      if (isMobile) return;
      refInput.value?.focus?.();
    };
    // 播放方法
    const playHandle = () => {
      state.loadStateType = 'play';
      state.eVideo?.play?.().catch(() => {
        setTimeout(() => {
          state.playBtnState = 'replay';
          state.loadStateType = 'error';
        }, 500);
      });
      state.playBtnState = 'pause';
      // 播放后清空状态
      // state.loadStateType = ''
    };
    // 暂停
    const pauseHandle = () => {
      // state.loadStateType = 'pause' // 暂停状态
      state.eVideo.pause();
      state.playBtnState = 'play'; // 暂停后要显示播放按钮
    };

    // 播放暂停
    const togglePlay = (ev: any) => {
      if (ev) ev.preventDefault();
      if (state.playBtnState == 'play' || state.playBtnState == 'replay') {
        // 点击播放按钮 或 重新播放按钮 后
        playHandle();
      } else if (state.playBtnState == 'pause') {
        // 点击暂停按钮后...
        pauseHandle();
      }
    };

    // 静音事件
    const mutedHandler = () => {
      state.muted = !state.muted;
      // 如果之前音量调整为0 取消静音时会把音量设置为5
      if (state.volume == 0) {
        state.volume = 0.05;
      }
    };

    //进度条事件
    const progressBarChange = (ev: Event, val) => {
      let duration = state.eVideo.duration || state.eVideo.target.duration; // 媒体总长
      state.eVideo.currentTime = duration * val;
      if (state.playBtnState == 'play') {
        state.eVideo?.play?.();
        state.playBtnState = 'pause';
      }
    };
    // 进度条移动
    const onProgressMove = (ev, val) => {
      state.progressCursorTime = timeFormat(state.eVideo.duration * val);
    };

    // 隐藏控制器
    const hideControl = debounce(() => {
      state.isVideoHovering = false;
    }, 2500);

    const mouseMovewWarp = (ev) => {
      state.isVideoHovering = true;
      hideControl();
    };

    // 播放速度
    const qualityLevelsHandle = (row, index) => {
      HlsV.value.currentLevel = index;
      state.currentLevel = index;
    };
    // 播放速度
    const playbackRate = (row) => {
      state.speedActive = row;
      state.eVideo.playbackRate = row;
    };
    //镜像画面事件
    const mirrorChange = (val) => {
      // console.log(val)
      emit('mirrorChange', val, state.eVideo);
    };
    // 是否循环事件
    const loopChange = (val) => {
      // console.log(val)
      emit('loopChange', val, state.eVideo);
    };
    // 关灯事件
    const lightOffChange = (val) => {
      // console.log(val)
      emit('lightOffChange', val, state.eVideo);
    };

    const requestPictureInPictureHandle = () => {
      requestPictureInPicture(state.eVideo);
    };
    // 全屏按钮
    const toggleFullScreenHandle = () => {
      state.fullScreen = toggleFullScreen(refPlayerWrap.value);
    };

    const init = (): void => {
      if (state.eVideo?.canPlayType?.(props.type) || state.eVideo?.canPlayType?.('application/vnd.apple.mpegurl')) {
        state.muted = props.autoPlay;
        // state.eVideo.load();
      }
      // // 使用hls解码
      else if (Hls.isSupported()) {
        HlsV.value = new Hls({ fragLoadingTimeOut: 2000 });
        HlsV.value.detachMedia(); //解除绑定
        const Video = props.type == 'video/mp4' ? state.eVideo : refeVideo.value;
        HlsV.value.attachMedia(Video);
        HlsV.value.on(Hls.Events.MEDIA_ATTACHED, () => {
          HlsV.value.loadSource(props.src);
          // 加载可用质量级别
          HlsV.value.on('hlsManifestParsed', (ev, data) => {
            console.log(data);
            state.currentLevel = data.level;
            state.qualityLevels = data.levels || [];
            // state.eVideo.load();
          });
        });

        HlsV.value.on('hlsLevelSwitching', (ev, data) => {
          console.log(data);
          // state.qualityLevels = Hls.levels || []
          console.log('LEVEL_SWITCHING');
          // state.eVideo.load();
        });
        HlsV.value.on('hlsLevelSwitched', (ev, data) => {
          state.currentLevel = data.level;
          // state.qualityLevels = Hls.levels || []
          console.log('LEVEL_SWITCHED');
          // state.eVideo.load();
        });
      }
    };

    watch(
      () => props.src,
      () => {
        nextTick(() => {
          // 初始化
          init();
        });
      },
      { immediate: true }
    );
    onMounted(() => {
      nextTick(() => {
        state.eVideo = refeVideo.value;
        inputFocusHandle();
      });
    });

    expose({
      play: playHandle, //播放
      pause: pauseHandle, //暂停
      togglePlay //暂停或播放
    });

    return {
      refPlayerWrap,
      refeVideo,
      refPlayerControl,
      refInput,
      mouseMovewWarp,
      mirrorChange,
      loopChange,
      lightOffChange,
      state,
      isMobile,
      videoEvents,
      toggleFullScreenHandle,
      togglePlay,
      keypress,
      keydownLeft,
      volumeKeydown,
      onProgressMove,
      progressBarChange,
      inputFocusHandle,
      mutedHandler,
      requestPictureInPictureHandle,
      playbackRate,
      qualityLevelsHandle,
      props: props
    };
  }
});
</script>
