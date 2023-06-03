<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { storeToRefs } from 'pinia';
import BackToHomeIcon from './BackToHomeIcon.vue';
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();
const { user, errorMessage } = storeToRefs(authStore);
console.log('user')
console.log(user)
const handleLogOut = () => {
  authStore.logout()
}
</script>


<template>
  <nav class="bg-transparent p-4">
    <div class="container mx-auto flex items-center">
      <div class="flex-grow">
        <BackToHomeIcon />
      </div>
      <div v-if="user" class="flex space-x-3 ">

        <router-link to="/account">
          <Icon icon="mdi:user-outline" color="139" width="36" />
        </router-link>

        <router-link to="/search">
          <Icon icon="ic:baseline-search" color="139" width="34" />
        </router-link>

        <button @click.prevent="handleLogOut">
          <Icon icon="material-symbols:logout" color="139" width="35" />
        </button>

      </div>
    </div>
  </nav>
</template>

