<script setup>
import Today from './components/Today.vue'
import Search from './components/Search.vue'
import {getTodaysWeather, getForecast} from './api/weatherAPI.js'
import { onMounted, ref } from 'vue'
import Forecast from './components/Forecast.vue'
const city = ref('')
const todaysWeather = ref(null);
const forecastWeather = ref(null);

onMounted(async () => {
  const searchedCity = sessionStorage.getItem('searchedCity');
  if (searchedCity) {
    city.value = searchedCity;
    await callAPIs(city.value);
  }
});

async function callAPIs(city) {
  try {
    // Call the API to get the weather for the searched city
    todaysWeather.value = await getTodaysWeather(city);

    // Call the API to get the forecast for the searched city
    forecastWeather.value = await getForecast(city);

    console.log(forecastWeather.value);
  }
  catch (error) {
    console.error('Error fetching forecast data:', error);
  }

}


async function handleSearch(searchedCity) {
  try {
    city.value = searchedCity;

    await callAPIs(city.value);

  }
  catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

</script>

<template>
  <!-- Watch for the emitted event of 'search' -->
  <Search @search="handleSearch"/>
  <Today 
    v-if="todaysWeather"
    :weather="todaysWeather"
  />

<Forecast 
    v-if="forecastWeather"
    :forecast="forecastWeather"
  />

</template>

