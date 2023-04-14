<template>
  <div class="bg-gray-200 w-1/2 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">
    <div class="bg-white rounded-lg p-6 shadow-lg">
      <form class="space-y-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          <div><label class="block text-sm font-bold">One Way</label>
            <input @click="oneWay = !oneWay" type="checkbox" v-model="oneWay" class="w-4 h-4">
          </div>

          <div>
            <label class="block text-sm font-bold">Departure</label>
            <input type="text" v-model="departure" class="w-1/2 border p-2 rounded" required>
          </div>
          <div>
            <label class="block text-sm font-bold">Destination</label>
            <input type="text" v-model="destination" class="w-1/2 border p-2 rounded" required>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label for="travelDate" class="block text-sm font-bold">Travel Date</label>
            <input type="date" v-model="travelDate" id="travelDate" class="w-full border p-2 rounded">
          </div>


          <div>
            <label for="returnDate" class="block text-sm font-bold">Return Date</label>
            <input :disabled="oneWay" type="date" v-model="returnDate" id="returnDate" class="w-full border p-2 rounded">

          </div>

        </div>

        <button @click.prevent="fetchInspirationSearch" type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Search
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const oneWay = ref(false);
</script>

<style lang="scss" scoped></style>