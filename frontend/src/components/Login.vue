<script >
import { useAuthStore } from '@/stores/useAuthStore.js';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
export default {
  setup() {
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");

    const login = async () => {
      await authStore.login(email.value, password.value);
    };

    const loginWithGoogle = async () => {
      await authStore.loginWithGoogle();
    };

    // const loginWithFacebook = async () => {
    //   await authStore.loginWithFacebook();
    // };

    return { email, password, login, loginWithGoogle };

  },
};
</script>

<template>
  <div class="bg-red-200 font-bold">
    <h3>login</h3>

  </div>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" autocomplete="off"/>
    <input v-model="password" type="password" placeholder="Password" autocomplete="off"/>
    <button type="submit">login</button>
    
    <button @click="loginWithGoogle" class="block bg-red-300">Login with Google</button>
    <!-- <button @click="loginWithFacebook">Login with Facebook</button> -->
    <p class="text-center text-md text-gray-900">
      Don't have an account yet?
      <router-link to="register" class="text-blue-500 no-underline hover:underline">
        Register
      </router-link>
    </p>
  </form>

</template>