<template>
    <div>
        1
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import createComponent from '../../../utils/create';
const { componentName, create } = createComponent('Link');

export default create({
    setup() {
        return {
            componentName
        }
    }
})
</script>