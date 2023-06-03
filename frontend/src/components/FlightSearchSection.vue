<template>
  <div class="bg-gray-200 w-1/2 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">
    <div class="bg-white rounded-lg p-6 shadow-lg">
      <form class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="flex items-center space-x-2">
            <label class="block text-sm font-bold">Anytime</label>
            <input @click="anytime = !anytime; anytime && (travelDate = ''); anytime && (returnDate = '')" type="checkbox"
              v-model="anytime" class="w-4 h-4">
          </div>
          <div class="flex items-center space-x-2">
            <label class="block text-sm font-bold">One Way</label>
            <input @click=" oneWay = !oneWay; oneWay && (returnDate = '') " type="checkbox" v-model=" oneWay "
              class="w-4 h-4">
          </div>
          <div class="flex items-center space-x-2">
            <label class="block text-sm font-bold">Explore everywhere</label>
            <input @click=" inspirationSearch = !inspirationSearch; inspirationSearch && (destination = '') "
              type="checkbox" v-model=" inspirationSearch " class="w-4 h-4">
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-bold">
              <Icon icon="carbon:departure" color="black" width="24" />
            </label>
            <input type="text" v-model=" departure " class="border p-2 rounded" placeholder="from..." required>
          </div>
          <div>
            <label class="block text-sm font-bold">
              <Icon icon="carbon:arrival" color="black" width="24" />
            </label>
            <input :disabled=" inspirationSearch " type="text" v-model=" destination " class="border p-2 rounded"
              placeholder="to..." required>
          </div>
          <div>
            <label class="block text-sm font-bold">
              <Icon
                icon="streamline:travel-airport-departure-time-travel-plane-trip-airplane-time-off-adventure-timer-take-clock"
                color="black" width="24" />
            </label>
            <input :disabled=" anytime " type="date" v-model=" travelDate " id="travelDate" class="border p-2 rounded">
          </div>
          <div>
            <label class="block text-sm font-bold">
              <Icon
                icon="streamline:travel-airport-arrival-time-plane-airplane-trip-land-travel-time-adventure-timer-clock"
                color="black" width="24" />
            </label>
            <input :disabled=" anytime || oneWay " type="date" v-model=" returnDate " id="returnDate"
              class="border p-2 rounded">
          </div>
        </div>

        <div class="flex justify-center">
          <button @click.prevent=" handleSubmit " type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Search
          </button>
        </div>
        <div v-if=" showSpinner " class="flex justify-center items-center">
          <Icon icon="svg-spinners:bars-rotate-fade" color="#367" width="24" />
        </div>


      </form>

      <div v-if=" !cityFlightData.value && !flights.value " class="grid grid-cols-3 gap-4 mt-10">
        <div v-for="(   flight, index   ) in   countryFlightData.value  " :key=" index "
          class="bg-white rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-bold">{{ flight.CountryNameEnglish }}</h3>
          <img @click="
            flightSto.searchFlightEverywhereDetails(flight.CountryId, {
              anytime: anytime,
              oneWay: oneWay,
              travelDate: travelDate,
              returnDate: returnDate,
              currency: 'SEK',
              countryCode: 'US',
              market: 'en-US',
            })
          " :src=" flight.ImageUrl " alt="Country image" class="clickable-image w-full h-64 mt-4 rounded" />
          <p class="mt-4">Price: {{ flight.Price }} {{ flight.CurrencyId }}</p>
        </div>
      </div>

      <div v-if=" cityFlightData.value && !flights.value " class="grid grid-cols-3 gap-4 mt-10">
        <div v-for="(   flight, index   ) in cityFlightData.value " :key=" index "
          class="bg-white rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-bold">{{ flight.title }}</h3>
          <img @click="
            flightSto.searchFlights(flight.destinationPlaceId, flight.outboundDepartureDate, {
              returnDate: returnDate,
              oneWay: oneWay,
              currency: 'SEK',
              countryCode: 'US',
              market: 'en-US',
            })
          " :src=" flight.imageUrl " alt="Country image" class="clickable-image w-full h-64 mt-4 rounded" />
          <p class="mt-4">Price: {{ flight.price }} {{ flight.currencyId }}</p>
        </div>
      </div>

      <div v-if=" flights.value " class="container mx-auto px-2 sm:px-0">
        <FlightDataSection :flights=" flights.value " :save-flight=" saveFlight " />
      </div>

    </div>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useAuthStore } from "@/stores/useAuthStore.js";
import FlightDataSection from "@/components/FlightDataSection.vue";
import { flightStore } from "@/stores/flightStore.js";

import { Icon } from "@iconify/vue";

const flightSto = flightStore();
const { user, errorMessage, countryFlightData, cityFlightData, flights, savedFlights, cityID } = storeToRefs(flightSto);
const anytime = ref(false);
const oneWay = ref(false);
const inspirationSearch = ref(false);
const isSearching = ref(false);
const showSpinner = computed(
  () =>
    isSearching.value &&
    flightSto.countryFlightData.length === 0 &&
    flightSto.cityFlightData.length === 0 &&
    flightSto.flights.length === 0
);

const departure = ref("");
const destination = ref("");
const travelDate = ref("");
const returnDate = ref("");
const authStore = useAuthStore();

const handleSubmit = async () => {
  flightSto.cityFlightData = []; // clear cityFlightData
  flightSto.countryFlightData = [];
  flightSto.flights = [];

  isSearching.value = true;

  await flightSto.getCodeByCity(departure.value);
  if (inspirationSearch.value) {
    await flightSto.searchFlightEverywhere(flightSto.cityID, {
      anytime: anytime.value,
      oneWay: oneWay.value,
      travelDate: travelDate.value,
      returnDate: returnDate.value,
      currency: 'SEK',
      countryCode: 'US',
      market: 'en-US',
    });
    console.log(flightSto.countryFlightData);
  } else {
    await flightSto.searchFlights(destination.value, travelDate.value, returnDate.value);
  }

  isSearching.value = false;
};

const saveFlight = async (flight) => {
  try {
    await flightSto.saveFlight(flight);
  } catch (error) {
    console.error(error);
  }
  
};

</script>



<style lang="scss" scoped>
.clickable-image {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable-image:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}
</style>