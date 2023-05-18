<template>
  <div
    :class="`e-scrollbar-bar e-scrollbar-${direction}`"
    @mousedown="handleBarMouseDown"
    :style="barStyle"
    ref="barRef"
  >
    <div class="e-scrollbar-thumb" ref="thumbRef" @mousedown="handleThumbMouseDown" :style="thumbStyleObj"></div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import BAR_MAP from './utils';
import { BarMap, BarMapItem } from './index.d';
import createComponent from '../../../utils/create';
import { BarProps } from './bar';

const { componentName, create } = createComponent('ScrollbarBar');

export default create({
  props: BarProps,
  setup(props: any) {
    const barRef = ref();
    const bar: ComputedRef<BarMapItem> = computed(() => (BAR_MAP as BarMap)[props.direction]);
    const thumbStyleObj = computed(() => ({
      ...props.thumbStyle,
      [bar.value.size]: props.size,
      transform: `translate${bar.value.axis}(${props.move})`
    }));

    /**
     * 点击轨道 滚动区域滚动到对应的位置 定位到滑块的中心点
     */
    const thumbRef = ref();
    function handleBarMouseDown(e: any) {
      const client = e[bar.value.client]; // 点击位置距客户端顶部或最左边的位置
      const wrap = barRef.value.getBoundingClientRect()[bar.value.direction]; // 滚动轨道距顶部或最左边的位置
      const offset = Math.abs(wrap - client); // 距离元素上或左边距的距离
      const thumbHalf = thumbRef.value[bar.value.offset] / 2; // thumb一般的高度
      const $parentWrap = props.parentRef;
      // console.log('$parentWrap', $parentWrap);

      const thumbPosPercent = ((offset - thumbHalf) * 100) / barRef.value[bar.value.offset];
      $parentWrap[bar.value.scroll] = (thumbPosPercent * $parentWrap[bar.value.scrollSize]) / 100;
    }

    const thumbDrag = ref(false);

    /**
     * 拖动过程中
     */
    function handleThumbMove(e: any) {
      if (!thumbDrag.value) {
        return;
      }
      const client = e[bar.value.client]; // 点击位置距客户端顶部或最左边的位置
      const wrap = barRef.value.getBoundingClientRect()[bar.value.direction]; // 滚动轨道距顶部或最左边的位置
      const offset = Math.abs(wrap - client); // 距离元素上或左边距的距离
      const thumbHalf = thumbRef.value[bar.value.offset] / 2; // thumb一般的高度
      const $parentWrap = props.parentRef;
      console.log('$parentWrap', $parentWrap);
      const thumbPosPercent = ((offset - thumbHalf) * 100) / barRef.value[bar.value.offset];
      $parentWrap[bar.value.scroll] = (thumbPosPercent * $parentWrap[bar.value.scrollSize]) / 100;
    }

    /**
     * 放开鼠标，拖动结束
     */
    function hanldeThumbUp(event: any) {
      thumbDrag.value = false;
      if (event.target) {
        document.removeEventListener('mousemove', handleThumbMove); // 注册在document上而不是event.target上是为了更流畅，为了解决鼠标滑动过快，滚动滑块跟不上，和未释放鼠标时，在滑块旁滚动的问题
        document.removeEventListener('mouseup', hanldeThumbUp);
      }
      document.onselectstart = () => null;
    }

    /**
     * 拖拽开始
     */
    function startDrag(event: Event) {
      thumbDrag.value = true;
      if (event.target) {
        document.addEventListener('mousemove', handleThumbMove);
        document.addEventListener('mouseup', hanldeThumbUp);
      }
      document.onselectstart = () => false;
    }

    /**
     * 鼠标在滑块thumb上按下
     */
    function handleThumbMouseDown(event: Event) {
      startDrag(event);
    }

    return {
      barRef,
      thumbRef,
      bar,
      thumbStyleObj,
      handleBarMouseDown,
      handleThumbMouseDown
    };
  }
});
</script>

<style lang="scss"></style>
