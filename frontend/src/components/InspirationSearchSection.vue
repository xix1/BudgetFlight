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
            <input :disabled="anytime || oneWay" type="date" v-model="returnDate" id="returnDate"
              class="w-1/2 border p-2 rounded">
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

      <div v-if="cityFlightData.length === 0 && flights.length === 0" class="grid grid-cols-3 gap-4 mt-10">
        <div v-for="(flight, index) in countryFlightData" :key="index" class="bg-white rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-bold">{{ flight.CountryNameEnglish }}</h3>
          <img @click="searchFlightEverywhereDetails(flight.CountryId)" :src="flight.ImageUrl" alt="Country image"
            class="clickable-image w-full h-64 mt-4 rounded" />
          <p class="mt-4">Price: {{ flight.Price }} {{ flight.CurrencyId }}</p>
        </div>
      </div>

      <div v-if="cityFlightData.length !== 0 && flights.length === 0" class="grid grid-cols-3 gap-4 mt-10">
        <div v-for="(flight, index) in cityFlightData" :key="index" class="bg-white rounded-lg p-6 shadow-lg">
          <h3 class="text-xl font-bold">{{ flight.title }}</h3>
          <img @click="searchFlights(flight.destinationPlaceId, flight.outboundDepartureDate)" :src="flight.imageUrl"
            alt="Country image" class="clickable-image w-full h-64 mt-4 rounded" />
          <p class="mt-4">Price: {{ flight.price }} {{ flight.currencyId }}</p>
        </div>
      </div>

      <div v-if="flights.length">
        <div v-for="(flight, index) in flights" :key="index" class="bg-white rounded-lg p-6 shadow-lg mb-4">
          <h3 class="text-xl font-bold">Flight {{ index + 1 }}</h3>
          <p>Departure: {{ flight.legs[0].departure }}</p>
          <p>Arrival: {{ flight.legs[0].arrival }}</p>
          <p>Origin: {{ flight.legs[0].origin.name }} - {{ flight.legs[0].origin.display_code }}</p>
          <p>Destination: {{ flight.legs[0].destination.name }} - {{ flight.legs[0].destination.display_code }}</p>
          <p>Carriers: {{ flight.legs[0].carriers[0].name }}</p>
          <p>Duration: {{ flight.totalDuration }} minutes</p>
          <p>Price: {{ flight.price.amount }} SEK</p>
          <p>Stop Count: {{ flight.legs[0].stop_count }}</p>
          <div v-if="flight.legs[0].stop_count > 0">
            <p>Stops:</p>
            <ul>
              <li v-for="(stop, i) in flight.legs[0].stops" :key="i">{{ stop.name }}</li>
            </ul>
          </div>
          <button @click.prevent="saveFlight(flight)">Save Flight</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore.js';

const anytime = ref(false);
const oneWay = ref(false);
const departure = ref('');
const travelDate = ref('');
const returnDate = ref('');
const cityID = ref('')

const countryFlightData = ref([]);
const cityFlightData = ref([]);
const flights = ref([]);

const authStore = useAuthStore();

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
const searchFlightEverywhere = async () => {
  try {
    const response = await axios.get('/searchFlightEverywhere', {
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
    countryFlightData.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
const handleSubmit = async () => {
  cityFlightData.value = []; // clear cityFlightData
  countryFlightData.value = [];
  flights.value = [];
  await getCodeByCity();
  await searchFlightEverywhere();
};

const searchFlightEverywhereDetails = async (CountryId) => {
  try {
    const response = await axios.get('/searchFlightEverywhereDetails', {
      params: {
        origin: cityID.value,
        CountryId: CountryId,
        anytime: anytime.value,
        oneWay: oneWay.value,
        travelDate: travelDate.value,
        returnDate: returnDate.value,
        currency: 'SEK',
        countryCode: 'US',
        market: 'en-US',
      },
    });
    cityFlightData.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const searchFlights = async (destination, date) => {
  try {
    const response = await axios.get('/searchFlights', {
      params: {
        origin: cityID.value,
        destination: destination,
        date: date,
        oneWay: oneWay.value,
        currency: 'SEK',
        countryCode: 'US',
        market: 'en-US',
      },
    });
    flights.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const saveFlight = async (flight) => {
  await authStore.saveFlight(flight);
}

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