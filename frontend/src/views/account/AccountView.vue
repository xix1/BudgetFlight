<script setup>
import NavbarView from "@/components/NavbarView.vue"
import FlightDataSection from '@/components/FlightDataSection.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { flightStore } from "@/stores/flightStore.js";

const flightSto = flightStore();
const authStore = useAuthStore();

onMounted(async () => {
    await flightSto.fetchUserFlights();
});

const deleteFlight = async (flightId) => {
    await flightSto.deleteFlight(flightId);
}

</script>

<template>
    <NavbarView />

    <video autoplay muted loop id="myVideo">
        <source src="../../../public/sea-30985.mp4" type="video/mp4">
    </video>
    <div class="bg-gray-200 w-1/2 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">

        <div class="bg-white rounded-lg p-6 shadow-lg">
            <div>
                <FlightDataSection :flights="flightSto.savedFlights" :deleteFlight="deleteFlight" />
            </div>
        </div>
    </div>
</template>
