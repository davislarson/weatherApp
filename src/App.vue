<script setup>
import Today from "./components/Today.vue";
import Search from "./components/Search.vue";
import Hourly from "./components/Hourly.vue";
import Forecast from "./components/Forecast.vue";
import { getForecast } from "./api/weatherAPI.js";
import { onMounted, ref, watchEffect } from "vue";

const city = ref("");
const todaysWeather = ref(null);
const forecastWeather = ref(null);
const hourlyForecast = ref([]);
const errorMessage = ref("");
const system = ref("f");
const loading = ref(false);
const cityTime = ref("");
const hourlyIndex = ref(0);

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
		loading.value = true;
		// Clear previous error state
		errorMessage.value = "";

		// Call the API to get the weather data for the searched city
		const weatherData = await getForecast(city);

		todaysWeather.value = weatherData;
		forecastWeather.value = weatherData;

		console.log(forecastWeather.value);

		loading.value = false;
	} catch (error) {
		console.error("Error fetching forecast data:", error);
		
		errorMessage.value = "City not found";

		// lear data to avoid displaying stale results:
		todaysWeather.value = null;
		forecastWeather.value = null;
		hourlyForecast.value = [];
		loading.value = false;
	}
}


watchEffect(() => {
	if (!forecastWeather.value || !forecastWeather.value.forecast) return;

	// Set the hourly forecast to the two days in advance
	let firstDay = forecastWeather.value.forecast.forecastday[hourlyIndex.value].hour;
	let secondDay = forecastWeather.value.forecast.forecastday[hourlyIndex.value + 1].hour;

	hourlyForecast.value = firstDay.concat(secondDay);
	cityTime.value = forecastWeather.value.location.localtime.split(' ')[1];
});

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

	<div v-if="loading" class="loading">Loading</div>

	<!-- Conditionally display error message -->
	<div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

	<div v-else-if="forecastWeather && todaysWeather" class="weatherContainer">
		<!-- Show weather components when no error -->
		<Today v-if="todaysWeather" :weather="todaysWeather" @change-system="changeSystem" />

		<Hourly v-if="hourlyForecast" :hourlyForecast="hourlyForecast" :system="system" :cityTime="cityTime"/>

		<!-- The @ will take in an event passed from forecast day.
				The user chooses a day they want to see the hourly for.
				The event is the hourly data for that day. -->
		<Forecast
			v-if="forecastWeather"
			:forecast="forecastWeather"
			@new-day-hourly="hourlyIndex = $event"
			:system="system"
		/>
	</div>
</template>

<style scoped>
.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 2em;
}
.error {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 2em;
	color: red;
}
</style>
