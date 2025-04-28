<script setup>
import Today from "./components/Today.vue";
import Search from "./components/Search.vue";
import Hourly from "./components/Hourly.vue";
import Forecast from "./components/Forecast.vue";
import { getTodaysWeather, getForecast } from "./api/weatherAPI.js";
import { onMounted, ref } from "vue";

const city = ref("");
const todaysWeather = ref(null);
const forecastWeather = ref(null);
const hourlyForecast = ref([]);
const errorMessage = ref("");
const system = ref("f");

function changeSystem(desiredSystem) {
	system.value = desiredSystem;
}

onMounted(async () => {
	const searchedCity = sessionStorage.getItem("searchedCity");
	if (searchedCity) {
		city.value = searchedCity;
		await callAPIs(city.value);
	}
});

async function callAPIs(city) {
	try {
		// Clear previous error state
		errorMessage.value = "";

		// Call the API to get the weather data for the searched city
		const weatherData = await getForecast(city);

		todaysWeather.value = weatherData;
		forecastWeather.value = weatherData;

		console.log(forecastWeather.value);

		// Set the hourly forecast to the first day of the forecast for now
		hourlyForecast.value = forecastWeather.value.forecast.forecastday[0].hour;
	} catch (error) {
		console.error("Error fetching forecast data:", error);
		// Use your own logic to determine the specific error message.
		errorMessage.value = "City not found";

		// Optionally, clear data to avoid displaying stale results:
		todaysWeather.value = null;
		forecastWeather.value = null;
		hourlyForecast.value = [];
	}
}

async function handleSearch(searchedCity) {
	try {
		city.value = searchedCity;
		await callAPIs(city.value);
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
}
</script>

<template>
	<!-- Emitted event of 'search' -->
	<Search @search="handleSearch" />

	<div class="weatherContainer">
		<!-- Show weather components when no error -->
		<div v-if="todaysWeather && forecastWeather">
			<Today v-if="todaysWeather" :weather="todaysWeather" @change-system="changeSystem" />

			<Hourly :hourlyForecast="hourlyForecast" :system="system" />

			<!-- The @ will take in an event passed from forecast day.
      The user chooses a day they want to see the hourly for.
      The event is the hourly data for that day. -->
			<Forecast
				v-if="forecastWeather"
				:forecast="forecastWeather"
				@new-day-hourly="hourlyForecast = $event"
				:system="system"
			/>
		</div>

		<!-- Conditionally display error message -->
		<div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
	</div>
</template>
