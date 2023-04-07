<script setup >
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';

const store = useAuthStore();

onMounted(()=>{
  store.init()
})

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
