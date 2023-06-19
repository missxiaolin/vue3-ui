<template>
  <div>
    <transition name="l-fade-in">
      <div class="l-player-dialog" v-if="state.dialogType">
        <div class="l-player-dialog-body">
          <h5 class="l-player-dialog-title">
            {{ state.dialogTitle }}
            <i @click="state.dialogType = false" class="icon icon-close">X</i>
          </h5>
          <!-- 快捷键说明 -->
          <ul class="l-player-hotkey-panel" v-show="state.dialogType == 'hotkey'">
            <li class="l-player-hotkey-panel-item" v-for="item of hotkeyList" :key="item.key">
              <span>{{ item.key }}</span>
              <span>{{ item.label }}</span>
            </li>
          </ul>
          <!-- 色彩调整 -->
          <ul class="l-player-filter-panel" v-show="state.dialogType == 'filter'">
            <li class="l-player-filter-panel-item">
              <span>饱和度</span>
              <l-video-slider class="filter-panel-slider" size="5px" v-model="filter.saturate"></l-video-slider>
              <span>{{ Math.round(filter.saturate * 255) }}</span>
            </li>
            <li class="l-player-filter-panel-item">
              <span>亮度</span>
              <l-video-slider class="filter-panel-slider" size="5px" v-model="filter.brightness"></l-video-slider>
              <span>{{ Math.round(filter.brightness * 255) }}</span>
            </li>
            <li class="l-player-filter-panel-item">
              <span>对比度</span>
              <l-video-slider class="filter-panel-slider" size="5px" v-model="filter.contrast"></l-video-slider>
              <span>{{ Math.round(filter.contrast * 255) }}</span>
            </li>
            <span @click="filterReset" title="重置" aria-label="重置" class="l-player-filter-reset">重置</span>
          </ul>
        </div>
      </div>
    </transition>
    <div class="l-player-contextmenu" v-if="state.show">
      <ul class="l-player-contextmenu-body" :style="menuStyle">
        <li :dplayerKeyCode="item.key" v-for="item of menuList" :key="item.key">{{ item.label }}</li>
      </ul>
      <input class="l-player-copyText" />
    </div>
  </div>
</template>

<script lang="ts">
import { watch, reactive, onMounted, computed, onUnmounted } from 'vue';
import { on, off } from '../../../../utils/dom';
import VideoSlider from './video-slider.vue';
import createComponent from '../../../../utils/create';
const { create } = createComponent('Contextmenu');

export default create({
  components: {
    [VideoSlider.name]: VideoSlider
  },
  setup(props, { emit }) {
    const state = reactive({
      show: false,
      dialogType: '',
      dialogTitle: '',
      mouseX: 0,
      mouseY: 0
    });

    const menuList = [
      { label: '视频色彩调整', key: 'filter' },
      { label: '快捷键说明', key: 'hotkey' },
      { label: '复制视频网址', key: 'copy' }
    ];
    const hotkeyList = [
      { key: 'Space', label: '播放/暂停' },
      { key: '→', label: '单次快进10s，长按5倍速播放' },
      { key: '←', label: '快退5s' },
      { key: '↑', label: '音量增加10%' },
      { key: '↓', label: '音量增加降低10%' },
      { key: 'Esc', label: '退出全屏/退出网页全屏' },
      { key: 'F', label: '全屏/退出全屏' }
    ];
    const filter = reactive({
      saturate: 0.392,
      brightness: 0.392,
      contrast: 0.392
    });

    // 菜单坐标
    const menuStyle = computed(() => ({
      left: state.mouseX + 'px',
      top: state.mouseY + 'px'
    }));

    watch(filter, (val) => {
      let PlayerVideoMain: any = document.querySelector('#dPlayerVideo');
      let saturate = (val.saturate * 2.55).toFixed(2);
      let brightness = (val.brightness * 2.55).toFixed(2);
      let contrast = (val.contrast * 2.55).toFixed(2);
      PlayerVideoMain.style.filter = `saturate(${saturate}) brightness(${brightness}) contrast(${contrast})`;
    });
    const filterReset = () => {
      filter.saturate = 0.392;
      filter.brightness = 0.392;
      filter.contrast = 0.392;
    };
    const keydownHandle = (ev) => {
      // ev.preventDefault()
      if (ev.key == 'Escape') {
        contextmenuHide(0);
      }
    };
    // 显示菜单
    const contextmenuShow = (ev) => {
      ev.preventDefault();
      on(window, 'keydown', keydownHandle); //启用快捷键
      on(window, 'click', contextmenuHide); //启用点击键
      let refPlayerWrap: any = document.querySelector('#refPlayerWrap');
      let clientWidth = refPlayerWrap.clientWidth;
      let clientHeight = refPlayerWrap.clientHeight;
      state.mouseX = ev.clientX - refPlayerWrap.getBoundingClientRect().left;
      if (clientWidth - state.mouseX < 130) {
        state.mouseX = state.mouseX + (clientWidth - state.mouseX - 130);
        // state.mouseX = state.mouseX - (clientWidth - state.mouseX)
      }

      state.mouseY = ev.clientY - refPlayerWrap.getBoundingClientRect().top;
      state.show = true;
    };

    // 隐藏菜单
    const contextmenuHide = (ev) => {
      let tagName = ev.path[0].tagName == 'LI';
      let keycode = ev.path[0].attributes.dplayerKeyCode && ev.path[0].attributes.dplayerKeyCode.value;
      let hotKeyArr = menuList.map((item) => item.key);
      if (tagName && hotKeyArr.includes(keycode)) {
        state.dialogTitle = ev.path[0].innerText;
        state.dialogType = keycode;
        if (keycode == 'copy') {
          let copyText: any = document.querySelector('.e-player-copyText');
          copyText.value = window.location.href;
          copyText.select();
          document.execCommand('copy');
          state.dialogType = '';
        } else if (keycode == 'version') {
          state.dialogType = '';
        }
      }
      state.show = false;
      // 卸载快捷键
      off(window, 'keydown', keydownHandle);
      off(window, 'click', contextmenuHide); //启用点击键
    };

    onMounted(() => {
      let refPlayerWrap: any = document.querySelector('#refPlayerWrap');
      // 卸载快捷键
      off(window, 'keydown', keydownHandle);
      off(window, 'click', contextmenuHide); //启用点击键
      off(refPlayerWrap, 'contextmenu', contextmenuShow);
      // 开启右键菜单
      on(refPlayerWrap, 'contextmenu', contextmenuShow);
    });
    onUnmounted(() => {
      let refPlayerWrap: any = document.querySelector('#refPlayerWrap');
      off(window, 'keydown', keydownHandle);
      off(window, 'click', contextmenuHide); //启用点击键
      off(refPlayerWrap, 'contextmenu', contextmenuShow);
    });

    return { state, hotkeyList, filter, filterReset, menuStyle, menuList };
  }
});
</script>
