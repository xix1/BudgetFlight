<template>
    <div v-for="( flight, index ) in  flights " :key=" index "
          class="flight-card my-4 border border-gray-300 rounded-lg p-4">
          <div class="flex justify-between mb-4">
            <div>
              <div class="font-bold text-lg">{{ new Date(flight.legs[0].departure).toLocaleTimeString('en-US', { hour:
                '2-digit', minute: '2-digit', hour12: false }) }}</div>
              <div class="text-sm text-gray-500" :title="flight.legs[0].origin.name">{{flight.legs[0].origin.display_code }}</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-sm">{{ flight.legs[0].duration }} mins</div>
              <div class="font-bold">--------------------</div>
              <div class="text-sm text-green-700">{{ flight.legs[0].stop_count == 0 ? 'Direct' : flight.legs[0].stops[0].name }}</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-lg">{{ new Date(flight.legs[0].arrival).toLocaleTimeString('en-US', { hour:
                '2-digit', minute: '2-digit', hour12: false }) }}</div>
              <div class="text-sm text-gray-500" :title="flight.legs[0].destination.name">{{flight.legs[0].destination.display_code }}</div>
            </div>
          </div>
          <div v-if=" flight.legs[1] " class="flex justify-between mb-4">
            <div>
              <div class="font-bold text-lg">{{ new Date(flight.legs[1].departure).toLocaleTimeString('en-US', { hour:
                '2-digit', minute: '2-digit', hour12: false }) }}</div>
              <div class="text-sm text-gray-500" :title="flight.legs[1].origin.name"> {{flight.legs[1].origin.display_code}}</div>
            </div>
            <div class="flex flex-col items-center">
              <div>{{ flight.legs[1].duration }} mins</div>
              <div class="font-bold">--------------------</div>
              <div class="text-sm text-green-700">{{ flight.legs[1].stop_count == 0 ? 'Direct' : flight.legs[1].stops[0].name }}</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-lg">{{ new Date(flight.legs[1].arrival).toLocaleTimeString('en-US', { hour:
                '2-digit', minute: '2-digit', hour12: false }) }}</div>
              <div class="text-sm text-gray-500" :title="flight.legs[1].destination.name">{{flight.legs[1].destination.display_code }}</div>
            </div>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <div>
              <p class=" mb-2 text-gray-500">Total Duration: {{ flight.totalDuration }} minutes</p>
            <p class=" text-gray-500">Price: {{ flight.price.amount }} SEK</p>
            </div>
            
            <button v-if="saveFlight" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              @click.prevent=" saveFlight(flight) ">Save Flight</button>
          </div>
        </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  flights: Array,
  saveFlight: Function
});
</script>


<style lang="scss" scoped>
.flight-card {
  border: px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 2.5rem 7rem;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

</style>