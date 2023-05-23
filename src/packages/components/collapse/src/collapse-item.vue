<template>
    <div>

    </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CollapseItemProps } from './collapse-item'

const { create } = createComponent('CollapseItem');

export default create({
    props: CollapseItemProps,
    setup(props, { emit }) {
        
    }
})
</script>