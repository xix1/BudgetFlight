<script setup>
import NavbarView from "@/components/NavbarView.vue"
import { getDocs, collection } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase/config.js';

const userFlights = ref([]);

onMounted(async () => {
    const userId = auth.currentUser.uid;
    const flightsCollection = collection(db, 'users', userId, 'flights');
    const flightSnapshot = await getDocs(flightsCollection);

    flightSnapshot.forEach(doc => {
        let flight = doc.data();
        flight.id = doc.id;
        userFlights.value.push(flight);
    });
});

</script>

<template>
    <NavbarView />

    <div id="videoDarkOverlay"></div>
    <video autoplay muted loop id="myVideo">
        <source src="../../../public/sea-30985.mp4" type="video/mp4">
    </video>
    <div class="bg-gray-200 w-1/2 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">
        <div class="bg-white rounded-lg p-6 shadow-lg">
            <div>
                <h2>Your flights</h2>
                
                    <div v-for="flight in userFlights" :key="flight.id" class="bg-white rounded-lg p-6 shadow-lg mb-4">
                        <p>{{ flight.legs[0].origin.name }} to {{ flight.legs[0].destination.name }}</p>
                        <p>{{ flight.legs[0].departure }} - {{ flight.legs[0].arrival }}</p>
                        <p>Duration: {{ flight.totalDuration }} minutes</p>
                        <p>Price: {{ flight.price.amount }} SEK</p>
                    </div>
                
            </div>
        </div>
    </div>
</template>
