<script>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { ref } from 'vue';
export default {
  setup() {
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");

    const register = async () => {
      await authStore.register(email.value, password.value);
    };

    return { email, password, register };
  },
};
</script>

<template>
  <div class="bg-red-200 font-bold">
    <h3>register</h3>

  </div>
  <form @submit.prevent="register">
    <input v-model="email" type="email" placeholder="Email" autocomplete="off" />
    <input v-model="password" type="password" placeholder="Password" autocomplete="off" />
    <button type="submit">Register</button>
  </form>
  <p class="text-center text-md text-gray-900">
    Already have an account?
    <router-link to="login" class="text-blue-500 no-underline hover:underline">
      Login
    </router-link>
  </p>
</template>
