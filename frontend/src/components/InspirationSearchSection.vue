<template>
    <div class="bg-gray-200 w-1/2 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">
    <div class="bg-white rounded-lg p-6 shadow-lg">
      <form class="space-y-4">
        <div class="grid grid-cols-5 gap-4">
            <div class="flex items-center space-x-2">
            <label class="block text-sm font-bold">Anytime</label>
            <input @click="anytime = !anytime" type="checkbox" v-model="anytime" class="w-4 h-4">
          </div>
          <div class="flex items-center space-x-2">
            <label class="block text-sm font-bold">One Way</label>
            <input @click="oneWay = !oneWay" type="checkbox" v-model="oneWay" class="w-4 h-4">
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-bold">Departure</label>
            <input type="text" v-model="departure" class="w-1/2 border p-2 rounded" required>
          </div>
          <div>
            <label class="block text-sm font-bold">Travel Date</label>
            <input :disabled="anytime" type="date" v-model="travelDate" id="travelDate" class="w-1/2 border p-2 rounded">
          </div>
          <div>
            <label class="block text-sm font-bold">Return Date</label>
            <input :disabled="anytime || oneWay" type="date" v-model="returnDate" id="returnDate" class="w-1/2 border p-2 rounded">
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          
        </div>
        <div class="flex justify-center">
          <button @click.prevent="handleSubmit" type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Search
          </button>
        </div>
      </form>

      <div class="grid grid-cols-3 gap-4 mt-10">
    <div
      v-for="(flight, index) in flightData"
      :key="index"
      class="bg-white rounded-lg p-6 shadow-lg"
    >
      <h3 class="text-xl font-bold">{{ flight.CountryNameEnglish }}</h3>
      <img :src="flight.ImageUrl" alt="Country image" class="w-full h-64 mt-4 rounded" />
      <p class="mt-4">Price: {{ flight.Price }} {{ flight.CurrencyId }}</p>
    </div>
  </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const anytime = ref(false);
const oneWay = ref(false);
const departure = ref('');
const travelDate = ref('');
const returnDate = ref('');
const cityID = ref('')

const flightData = ref([]);
const getCodeByCity = async () => {
    try {
        const response = await axios.get('/getCityID', {
            params: {
                query: departure.value
            },
        });
        cityID.value = response.data.CityId;
        console.log(cityID.value);
    } catch (error) {
    console.error(error);
}
};
const fetchInspirationSearch = async () => {
  try {
    const response = await axios.get('/inspirationSearch', {
      params: {
        origin: cityID.value,
        anytime: anytime.value,
        oneWay: oneWay.value,
        travelDate: travelDate.value,
        returnDate: returnDate.value,
        currency: 'SEK',
        countryCode: 'US',
        market: 'en-US',
      },
    });
    flightData.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
const handleSubmit = async () => {
  await getCodeByCity();
  await fetchInspirationSearch();
};
</script>

<style lang="scss" scoped>

</style>