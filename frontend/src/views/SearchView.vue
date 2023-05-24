<script setup>
import { ref } from 'vue';

import NavbarView from "@/components/NavbarView.vue"
import FlightSearchSection from '@/components/FlightSearchSection.vue';
import ShibaInuSection from '@/components/ShibaInuSection.vue';

const isFlightSearch = ref(true);
const switchToFlightSearch = () => {
    isFlightSearch.value = true;
};
const switchToShibaInu = () => {
    isFlightSearch.value = false;
};


</script>

<template>
    <NavbarView />
    <div>
        <div class="flex justify-center space-x-4 mt-4">
            <button @click="switchToFlightSearch"
                class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded shadow-md">
                Flight Search
            </button>
            <button @click="switchToShibaInu"
                class="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded shadow-md">
                Have some Shiba Inu
            </button>
        </div>
        <FlightSearchSection v-show="isFlightSearch" />
        <ShibaInuSection v-show="!isFlightSearch" />
    </div>
    <div id="videoDarkOverlay"></div>
    <video autoplay muted loop id="myVideo">
        <source src="../../../public/sea-30985.mp4" type="video/mp4">
    </video>
</template>

<style lang="scss" scoped>
/* ... */
</style>
