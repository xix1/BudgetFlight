
<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="bg-transparent">
      <div class="bg-gray-200 container mx-auto mt-10 px-5 pt-5 pb-10 rounded">
        <div class="bg-white rounded-lg p-6 shadow-lg">
          <form class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label for="departure" class="block text-sm font-bold">Departure</label>
                <select v-model="departure" id="departure" class="w-full border p-2 rounded">
                  <!-- Add the list of departure locations as options here -->
                </select>
              </div>
              <div>
                <label for="return" class="block text-sm font-bold">Return</label>
                <select v-model="return" id="return" class="w-full border p-2 rounded">
                  <option value="original">Return to Departure</option>
                  <option value="anywhere">Return Anywhere</option>
                </select>
              </div>
              <div>
                <label for="budget" class="block text-sm font-bold">Budget (less than)</label>
                <input v-model="budget" type="range" id="budget" min="0" max="10000" step="100" class="w-full border p-2 rounded">
                <span>{{ budget }} €</span>
              </div>
              <div>
                <label for="numberOfPeople" class="block text-sm font-bold">Number of People</label>
                <input v-model="numberOfPeople" type="number" id="numberOfPeople" placeholder="Number of People" class="w-full border p-2 rounded" required>
              </div>
              <div>
                <label for="countries" class="block text-sm font-bold">Interested European Countries</label>
                <select v-model="countries" id="countries" multiple class="w-full border p-2 rounded">
                  <!-- Add the list of countries as options here -->
                </select>
              </div>
              
              

              
            </div>
            <div class="flex justify-center">
              <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  ``
  
  

<style lang="scss" scoped>

</style>