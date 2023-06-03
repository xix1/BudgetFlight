<template>
  <div class="bg-gray-200 w-1/2 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">
    <div class="bg-white rounded-lg p-6 shadow-lg">
      <form class="space-y-4">
        <button @click.prevent="getShibaInu()"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Click!
        </button>

        <div v-if="shibaUrl.length">

          <img :src="shibaUrl" alt="ShibaInu image" 
          class="w-full h-full mt-4 rounded"/>
        </div>

        <div v-else>
          Wilderness without Shiba Inu...
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const shibaUrl = ref('');
const getShibaInu = async () => {
  try {
    const response = await axios.get('/getShibaInu', {});
    shibaUrl.value = response.data[0];
    console.log(response.data[0]);
  } catch (error) {
    console.error(error);
  }
}

</script>

<style lang="scss" scoped></style>