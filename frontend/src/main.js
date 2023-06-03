import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

import { useAuthStore } from './stores/useAuthStore';
import { flightStore } from './stores/flightStore';
const authStore = useAuthStore();
authStore.init();

const flight = flightStore();
flight.init();
flight.fetchUserFlights();

app.mount('#app')
