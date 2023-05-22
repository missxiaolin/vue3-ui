<template>
    <div :class="[ns.b()]">
        <Default />
    </div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import Default from './default-empty.vue'

const { create } = createComponent('Empty');

export default create({
    components: {
        Default
    },
    setup() {
        const ns = useNamespace('empty')

        return {
            ns
        }
    }
})
</script>