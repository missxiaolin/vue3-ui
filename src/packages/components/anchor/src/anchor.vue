<template>
    <div>
        锚点
    </div>
</template>

<script lang="ts">
import { toRefs, ref, h, reactive, onMounted, shallowRef, nextTick, computed } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { anchorProps, anchorEmits } from './anchor';
const { create } = createComponent('Anchor');

import { Icon } from '../../icon';
import { Sticky } from '../../sticky';

export default create({
    components: {
        Sticky,
        Icon
    },
    props: anchorProps,
    emits: anchorEmits,
    setup(props, { emit, attrs, expose }) {
        const { affix, wrapperClass, wrapperStyle, showInkInFixed } = props;

        onMounted(() => {
            nextTick(() => {
                if (props.target) {
                    
                }
            })
        })
    }
})
</script>