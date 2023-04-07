<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import BackToHomeIcon from './BackToHomeIcon.vue';

const authStore = useAuthStore();
const { user, errorMessage } = storeToRefs(authStore);
const email = ref("");
const password = ref("");

const login = async () => {
  await authStore.login(email.value, password.value);
};

const loginWithGoogle = async () => {
  await authStore.loginWithGoogle();
};


  
</script>

<template>
  <div class="min-h-screen  flex flex-col items-center justify-center">
    <BackToHomeIcon />
    <div class="text-white font-bold text-3xl mb-8 p-4 rounded-lg bg-transparent">
      <h3>Login</h3>
    </div>

  <form @submit.prevent="login"
  class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3">
  <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="off"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="off"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <button
          @click="loginWithGoogle"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login with Google
        </button>
      </div>
      <p class="text-center text-md text-gray-900 mt-4">
        Don't have an account yet?
        <router-link
          to="register"
          class="text-blue-500 no-underline hover:underline"
          @click="errorMessage = ''"
        >
          Register
        </router-link>
      </p>

      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert">
        <strong class="font-bold">Error! </strong>
        <span class="block sm:inline">{{ errorMessage }}</span>
      </div>
  </form>
</div>
<div id="videoDarkOverlay"></div>
<video autoplay muted loop id="myVideo">
        <source src="../../../public/gondola-41832.mp4" type="video/mp4">
    </video>
</template>