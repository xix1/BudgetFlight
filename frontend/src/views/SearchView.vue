<script setup>
import { ref, computed } from 'vue';

import NavbarView from "@/components/NavbarView.vue"
import FlightSearchSection from '@/components/FlightSearchSection.vue';
import ShibaInuSection from '@/components/ShibaInuSection.vue';

import { Icon } from '@iconify/vue';

const isFlightSearch = ref(true);
const switchToFlightSearch = () => {
    isFlightSearch.value = true;
};
const switchToShibaInu = () => {
    isFlightSearch.value = false;
};

// Add computed properties to control the color of the icons
const flightIconColor = computed(() => isFlightSearch.value ? "139" : "white");
const shibaIconColor = computed(() => !isFlightSearch.value ? "orange" : "white");

</script>

<template>
    <NavbarView />
    <div>
        <div class="flex justify-center space-x-12 mt-4">
            <button @click="switchToFlightSearch">
                <Icon :color="flightIconColor" icon="mdi:flight"  width="44" height="44"/>
            </button>
            <button @click="switchToShibaInu">
                <Icon :color="shibaIconColor" icon="fa6-solid:dog" width="35" height="35" />
            </button>
        </div>

        <FlightSearchSection v-show="isFlightSearch" />
        <ShibaInuSection v-show="!isFlightSearch" />
    </div>
    <video autoplay muted loop id="myVideo">
        <source src="../../../public/sea-30985.mp4" type="video/mp4">
    </video>
</template>

<style lang="scss" scoped>
/* ... */
</style>
