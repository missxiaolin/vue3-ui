<template>
    <doc-header></doc-header>
    <div>
        resource
    </div>
    <doc-footer></doc-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/sites/pc/components/header.vue';
import Footer from '@/sites/pc/components/footer.vue';

export default defineComponent({
  name: 'resource',
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer
  }
});
</script>