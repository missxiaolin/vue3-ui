<template>
  <div class="l-video-loading" :style="loadingStyle" v-show="LOAD_TYPE.includes(loadType)">
    <div>
      <!-- 初始化加载 -->
      <span v-if="loadType == 'loadstart'">
        <i class="rotating iconfont icon-loading f50"></i>
        <p>{{ text }}</p>
      </span>
      <!-- 缓冲中 -->
      <span v-show="loadType == 'waiting'">
        <i class="rotating iconfont icon-loading f50"></i>
        <p>正在缓冲...</p>
      </span>
      <!-- 播放结束 -->
      <span v-show="loadType == 'ended'">
        <p @click="replayHandle" class="l-flex-x l-pointer"> <i class="iconfont icon-replay f24 mr5"></i>重新播放 </p>
      </span>
      <!-- 播放错误 -->
      <span v-show="loadType == 'error' || loadType == 'stalled'">
        <p @click="replayHandle" class="l-flex-x e-pointer"> <i class="iconfont icon-replay f24 mr5"></i>请求错误 </p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, computed, toRaw } from 'vue';
import { Icon } from '../../../../components/icon/index';
import createComponent from '../../../../utils/create';
const { create } = createComponent('VideoLoading');

export default create({
  components: {
    Icon
  },
  props: {
    loadType: String,
    text: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const { proxy }: any = getCurrentInstance();
    const LOAD_TYPE = ['loadstart', 'waiting', 'ended', 'error', 'stalled'];
    const replayHandle = () => {
      proxy.$parent.play();
    };
    const loadingStyle = computed(() => {
      let style = 'background: rgba(0, 0, 0, .1);z-index:1';
      if (props.loadType == 'loadstart') {
        style = 'background: rgba(0, 0, 0, 1);;z-index:3';
      }
      return style;
    });

    return {
      LOAD_TYPE,
      loadingStyle,
      replayHandle,
      ...toRaw(props)
    };
  }
});
</script>
