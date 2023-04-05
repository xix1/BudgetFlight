<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/views/Navbar.vue'
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';

const store = useAuthStore();

onMounted(()=>{
  store.init()
})
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>

</style>
