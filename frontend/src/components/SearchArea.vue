<script setup>
import { ref } from 'vue';


import InspirationSearchSection from '@/components/InspirationSearchSection.vue';
import SpecificSearchSection from '@/components/SpecificSearchSection.vue';

const isInspirationSearch = ref(true);
const switchToInspirationSearch = () => {
  isInspirationSearch.value = true;
};
const switchToSpecificSearch = () => {
  isInspirationSearch.value = false;
};


</script>

<template>
  <div>
    <div class="flex justify-center space-x-4 mt-4">
      <button @click="switchToInspirationSearch"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded shadow-md">
        Inspiration Search
      </button>
      <button @click="switchToSpecificSearch"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded shadow-md">
        Specific Search
      </button>
    </div>
    <InspirationSearchSection v-show="isInspirationSearch"/>
    <SpecificSearchSection v-show="!isInspirationSearch" />
  </div>
</template>

<style lang="scss" scoped>
/* ... */
</style>
