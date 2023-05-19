<template>
  <teleport :to="to ?? 'body'">
    <transition name="l-loading-bar-fade">
        <div class="l-loading-bar-container">
            <div ref="loadingBarRef">

            </div>
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

    return {
      componentName,
      ns,
      to
    };
  }
});
</script>
