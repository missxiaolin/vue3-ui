<template>
    <div>
        aa
    </div>
</template>

<script lang="ts">
import { toRefs, ref, h, reactive, onMounted, shallowRef, nextTick, computed } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
const { create, componentName } = createComponent('AnchorLink');


export default create({
    
    setup() {
        return {
            componentName
        }
    }
})
</script>