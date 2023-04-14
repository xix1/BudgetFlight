<template>
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
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>