<template>
  <div
    ref="refSlider"
    class="l-video-slider"
    @mousedown.stop="mouseDownHandle"
    @contextmenu="contextmenuHandle"
    :class="{ 'is-vertical': props.vertical }"
  >
    <div class="l-slider__runway" @mousemove="mousemoveHandle" :style="{ '--l-video-slider-size': size }">
      <div class="l-slider__cursor" :style="hoverStyle" v-show="props.hover">
        <div class="l-slider__tips" ref="refTips" :style="{ left: state.hoverTipsLeft }" v-show="props.hoverText">
          {{ props.hoverText }}
        </div>
      </div>
      <div class="l-slider__preload" :style="preloadStyle"></div>
      <div class="l-slider__bar" :style="sliderBarStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, Ref, computed, toRef, toRaw } from 'vue';
import { on, off } from '../../../../utils/dom';
import createComponent from '../../../../utils/create';
const { create } = createComponent('VideoSlider');

export default create({
  props: {
    modelValue: {
      required: true,
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    hover: { type: Boolean, default: true }, // 鼠标hover位置
    hoverText: { type: String, default: '' }, // 鼠标hover位置
    preload: { type: Number, default: 0 }, // 预加载load
    size: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change', 'onMousemove'],
  setup(props, { emit }) {
    const refSlider = ref(null);
    const refTips = ref(null);
    const state = reactive({
      dragging: false, //拖拽状态
      hoverPosition: 0, //鼠标位置
      hoverTipsLeft: '50%' //提示偏移位置
    });
    // 获取当前位置的高度或宽度
    const sliderBarStyle: any = computed(() => {
      let value = props.modelValue < 0 ? 0 : props.modelValue > 1 ? 1 : props.modelValue;
      return props.vertical ? `height:${value * 100}%` : `width:${value * 100}%`;
    });

    // 预加载进度条样式
    const preloadStyle: any = computed(() => {
      let value = props.preload < 0 ? 0 : props.preload > 1 ? 1 : props.preload;
      return props.vertical ? `height:${value * 100}%` : `width:${value * 100}%`;
    });
    // 预加载进度条样式
    const hoverStyle: any = computed(() => {
      let value = state.hoverPosition < 0 ? 0 : state.hoverPosition > 1 ? 1 : state.hoverPosition;
      return props.vertical ? `bottom:${value * 100}%` : `left:${value * 100}%`;
    });
    // 阻止右键事件
    const contextmenuHandle = (ev: MouseEvent) => {
      ev.preventDefault();
    };
    // 按下事件
    const mouseDownHandle = (ev: MouseEvent) => {
      if (props.disabled) return;
      ev.preventDefault();
      state.dragging = true;
      setPosition(ev); //设置当前位置
      on(window, 'mousemove', onDragging);
      on(window, 'touchmove', onDragging);
      on(window, 'mouseup', onDragEnd);
      on(window, 'touchend', onDragEnd);
    };
    // 鼠标移动事件
    const mousemoveHandle = (ev: MouseEvent) => {
      if (!props.hover) return;
      let val = getPosition(ev);
      emit('onMousemove', ev, val);
      state.hoverPosition = val;
      if (props.vertical) return;
      //获取dom
      let refSliderEl = refSlider.value;
      // 提示宽的一半宽度
      let refTipsWidth = refTips.value.clientWidth / 2;
      let movePositon = ev.clientX - refSliderEl.getBoundingClientRect().left;
      // 如果当前往左的偏移量大于提示框宽度
      if (movePositon < refTipsWidth) {
        state.hoverTipsLeft = refTipsWidth - movePositon + 'px';
      } else if (refSliderEl.clientWidth - movePositon < refTipsWidth) {
        // 如果当前往右的偏移量大于提示框宽度  （总宽度-当前移动位置）< tips一半的宽度
        state.hoverTipsLeft = refSliderEl.clientWidth - movePositon - refTipsWidth + 'px';
      } else {
        state.hoverTipsLeft = '50%';
      }
    };

    // 设置位置
    const setPosition = (ev: any) => {
      let value = getPosition(ev);
      emit('update:modelValue', value);
      emit('change', ev, value);
    };
    // 获取当前事件位置
    const getPosition = (ev: any) => {
      //获取dom
      let refSliderEl = refSlider.value as unknown as HTMLButtonElement;
      let value = 0;
      if (props.vertical) {
        // 垂直模式下获取高度
        let clientHeight = refSliderEl.clientHeight;
        value = (refSliderEl.getBoundingClientRect().bottom - ev.clientY) / clientHeight;
      } else {
        value = (ev.clientX - refSliderEl.getBoundingClientRect().left) / refSliderEl.clientWidth;
      }
      return value < 0 ? 0 : value > 1 ? 1 : value;
    };
    // 拖拽中
    const onDragging = (ev: Event) => {
      setPosition(ev); //获取当前按下位置
    };
    // 拖拽结束
    const onDragEnd = (ev: Event) => {
      if (state.dragging) {
        off(window, 'mousemove', onDragging);
        off(window, 'touchmove', onDragging);
        off(window, 'mouseup', onDragEnd);
        off(window, 'touchend', onDragEnd);
        off(window, 'contextmenu', onDragEnd);
        setTimeout(() => {
          state.dragging = false;
        }, 0);
      }
    };

    return {
      refSlider,
      refTips,
      mouseDownHandle,
      contextmenuHandle,
      mousemoveHandle,
      hoverStyle,
      state,
      preloadStyle,
      sliderBarStyle,
      props: toRaw(props)
    };
  }
});
</script>
