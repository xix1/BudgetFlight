<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user, errorMessage } = storeToRefs(authStore);
console.log('user')
console.log(user)
const handleLogOut = () => {
  authStore.logout()
}
</script>

<template>

<!-- <div v-show="user">
  <button @click.prevent="handleLogOut" class="cursor-pointer block w-full text-left ">
    log out
</button>
<div>
  {{ user }}
</div>
</div> -->
<nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white font-bold text-xl">
        Your App
      </div>
      <div v-if="user" class="flex items-center space-x-4">
        <div class="text-white">
          {{ user.email }}
        </div>
        <button
          @click.prevent="handleLogOut"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>

</template>