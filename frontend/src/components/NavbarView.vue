<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { storeToRefs } from 'pinia';
import BackToHomeIcon from './BackToHomeIcon.vue';

const authStore = useAuthStore();
const { user, errorMessage } = storeToRefs(authStore);
console.log('user')
console.log(user)
const handleLogOut = () => {
  authStore.logout()
}
</script>

<!-- <template>
  <nav class="bg-transparent p-4 flex justify-between items-center">
    <BackToHomeIcon />
    <div v-if="user" class="flex  space-x-4">
      <div class="text-white">
        {{ user.email }}
      </div>
      <button @click.prevent="handleLogOut"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Log out
      </button>
    </div>
  </nav>
</template> -->

<template>
  <nav class="bg-transparent p-4">
    <div class="container mx-auto flex items-center">
      <div class="flex-grow">
        <BackToHomeIcon />
      </div>
      <div v-if="user" class="flex space-x-8 ">
        <div class="text-white font-bold text-2xl">{{ user.email }}</div>
        <button
          @click.prevent="handleLogOut"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>
</template>

