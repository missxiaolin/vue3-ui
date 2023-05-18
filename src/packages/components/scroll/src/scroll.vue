<template>
    <div>

    </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, reactive, ref, toRefs, toRaw, computed } from 'vue';
import { addUnit } from '../../../utils/util';
import type { StyleValue, CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
import { ScrollProps } from './scroll'
import { Bar } from '../plugins/bar.vue'

const { componentName, create } = createComponent('Scroll');

export default create({
    components: {
        Bar
    },
    props: ScrollProps,
    setup(props: any, { emit, attrs }: any) {
        const wrapRef = ref();
        const hasLoad = Object.prototype.toString.call(toRaw(attrs.onLoad)) === '[object Function]' && props.canOnLoad;
        const scrollbar = ref();
        const scrollBarContent = ref(); // 滚动内容区域
        let scrollLoading = ref(false); // 滚动加载状态
        let beforeScrollTop = ref(0); // 记录之前滚动值 计算滚动方向
        let scrollStyle = ref();
    }
})

</script>