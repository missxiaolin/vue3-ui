<template>
    <div>
1
    </div>
</template>

<script lang="ts">
import { PageHeaderProps, pageHeaderEmits } from './page-header'
import { toRefs, ref, watch, onMounted, computed } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('PageHeader');

export default create({
    props: PageHeaderProps,
    emits: pageHeaderEmits,
    setup(props, { emit }) {

    }
})
</script>
