<template>
  <teleport :to="to ?? 'body'">
    <transition name="l-loading-bar-fade">
      <div class="l-loading-bar-container">
        <div ref="loadingBarRef" :class="[ns.b(), {
            'l-loading-bar__starting': isStart,
            'l-loading-bar__error': isError,
            'l-loading-bar__finishing': isFinish
        }]"> </div>
      </div>
    </transition>
  </teleport>
  <slot></slot>
</template>

<script lang="ts">
import { toRefs, ref, nextTick, provide, computed, onMounted } from 'vue';
import { useNamespace } from '../../../hooks';
import { loadingBarProps, loadingBarEmits, loadingBarInjectionKey } from './loading-bar';
import createComponent from '../../../utils/create';

const { create, componentName } = createComponent('LoadingBar');

export default create({
  components: {},
  props: loadingBarProps,
  emits: loadingBarEmits,
  setup(props) {
    const ns = useNamespace('loading-bar');
    const { loadingBarStyle, to } = toRefs(props);
    const isStart = ref(true); // 是否开启
    const isEnter = ref(false); // 动画是否开启
    const isError = ref(false); // 是否报错

    return {
      componentName,
      ns,
      to,
      isStart,
      isEnter,
      isError
    };
  }
});
</script>
