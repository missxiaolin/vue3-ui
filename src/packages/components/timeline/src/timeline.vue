<template>
    <ul :class="ns.b()">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import { provide } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Timeline');

export default create({
    setup(props, { slots }) {
        const ns = useNamespace('timeline')
        provide('timeline', slots)
        return {
            componentName,
            ns
        }
    }
})

</script>