import router from '@/router/index.js';
import { defineStore } from 'pinia';
import { doc, setDoc, deleteDoc, collection,getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/config.js";
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';

export const flightStore = defineStore("db", {
    state: () => {
        return {
            user: null,
            errorMessage: "",
            countryFlightData: [],
            cityFlightData: [],
            flights: [],
            savedFlights: [],
            cityID: ''
        };
    },
    getters: {},
    actions: {
        init() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.setUser(user);
                    // router.replace({name:'home'})
                } else {
                    this.user = {};
                    router.push({ name: "home" });
                }
            });
        },
        setUser(user) {
            this.user = user;
        },

        async saveFlight(flightData) {
            if (!this.user) {
                throw new Error("User must be logged in to save flight.");
            }

            const userDoc = doc(db, "users", this.user.uid);
            const flightDoc = doc(userDoc, "flights", flightData.id);

            await setDoc(flightDoc, flightData);
            this.savedFlights.push(flightData);
            console.log(this.savedFlights);
            console.log(this.savedFlights.length);
        },

        async deleteFlight(flightId) {
            if (!this.user) {
                throw new Error("User must be logged in to save flight.");
            }
            const userId = auth.currentUser.uid;
            const flightRef = doc(db, "users", userId, "flights", flightId);
            await deleteDoc(flightRef);
            this.savedFlights = this.savedFlights.filter(
                (flight) => flight.id !== flightId
            );
        },

        async fetchUserFlights() {
            if (!this.user) {
                throw new Error("User must be logged in to fetch flights.");
            }
        
            const userId = auth.currentUser.uid;
            const flightsCollection = collection(db, 'users', userId, 'flights');
            const flightSnapshot = await getDocs(flightsCollection);
        
            this.savedFlights = flightSnapshot.docs.map(doc => {
                let flight = doc.data();
                flight.id = doc.id;
                return flight;
            });
        },
        
        async getCodeByCity(city) {
            try {
                const response = await axios.get('/getCityID', {
                    params: {
                        query: city
                    },
                });
                this.cityID = response.data.CityId;
                console.log(this.cityID);
            } catch (error) {
                console.error(error);
            }
        },

        async searchFlightEverywhere(cityID, params) {
            try {
                const response = await axios.get('/searchFlightEverywhere', {
                    params: {
                        origin: cityID,
                        anytime: params.anytime,
                        oneWay: params.oneWay,
                        travelDate: params.travelDate,
                        returnDate: params.returnDate,
                        currency: params.currency,
                        countryCode: params.countryCode,
                        market: params.market,
                    },
                });
                this.countryFlightData.value = response.data.data;
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },

        async searchFlightEverywhereDetails(CountryId, params) {
            try {
                const response = await axios.get('/searchFlightEverywhereDetails', {
                    params: {
                        origin: this.cityID,
                        CountryId: CountryId,
                        anytime: params.anytime,
                        oneWay: params.oneWay,
                        travelDate: params.travelDate,
                        returnDate: params.returnDate,
                        currency: params.currency,
                        countryCode: params.countryCode,
                        market: params.market,
                    },
                });
                this.cityFlightData.value = response.data.data;
                console.log(this.cityFlightData);
                console.log(this.cityFlightData.length)

            } catch (error) {
                console.error(error);
            }
        },

        async searchFlights(destination, date, params) {
            try {
                const response = await axios.get('/searchFlights', {
                    params: {
                        origin: this.cityID,
                        destination: destination,
                        date: date,
                        returnDate: params.returnDate,
                        oneWay: params.oneWay,
                        currency: params.currency,
                        countryCode: params.countryCode,
                        market: params.market,
                    },
                });

                this.flights.value = response.data.data;
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
    },
});
