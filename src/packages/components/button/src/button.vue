<template>
    <button :class="['l-button']">
        ceshi
    </button>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Button');

export default create({
    emits: ['click'],
})
</script>