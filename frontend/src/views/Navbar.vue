<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { Icon } from '@iconify/vue';
const store = useAuthStore();
const handleLogOut = () => {
  store.logout()
}
</script>

<template>

<areffect />
<button @click.prevent="handleLogOut" class="cursor-pointer block w-full text-left ">
    log out
</button>

</template>