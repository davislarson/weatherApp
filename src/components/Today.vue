<script setup>
import { computed, ref } from "vue";

const props = defineProps({
	weather: {
		type: Object
	},
});
const emit = defineEmits(["changeSystem"]);
const currentSystem = ref("f");

function changeSystem(system) {
	if (currentSystem.value === system) {
		return;
	}
	currentSystem.value = system;

	emit("changeSystem", system);
}

const timeOnly = computed(() => {
  // time is expected in the format "YYYY-MM-DD HH:mm"
  const timePart = props.weather.location.localtime.split(" ")[1]; // e.g., "14:05"
  let [hour, minutes] = timePart.split(":");
  hour = parseInt(hour);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minutes} ${period}`;
});
const dayOfWeek = computed(() => {
	// Replace the space with "T" to comply with ISO format
	const localTimeISO = props.weather.location.localtime.replace(" ", "T");
	const localDate = new Date(localTimeISO);
	return localDate.toLocaleDateString("en-US", { weekday: "long" });
});
</script>

<template>
	<div class="today">
		<div class="today-city">
			<h2>{{ weather.location.name }}, {{ weather.location.region }}</h2>
			<h4>Currently</h4>
		</div>
		<div class="today-quick-items">
			<img
				:src="weather.current.condition.icon"
				:alt="`Weather icon for ${weather.current.condition.text} weather`"
			/>

			<div class="today-temp">
				<h3>{{ Math.round(weather.current['temp_' + currentSystem]) }} 
					<span>
						<span class="smallText" :class="currentSystem === 'f' ? '':'notSelected'" @click="changeSystem('f')">°F</span>
						<span class="smallText">|</span>
						<span class="smallText" :class="currentSystem === 'c' ? '':'notSelected'" @click="changeSystem('c')">°C</span>
					</span>
				</h3>
			</div>

			<div class="today-percents">
				<p>
					<span class="label">Humidity:</span> <span class="value">{{ weather.current.humidity }}%</span>
				</p>
				<p>
					<span class="label">Chance of Rain:</span> <span class="value">{{ weather.forecast.forecastday[0].day.daily_chance_of_rain }}%</span>
				</p>
				<p>
					<span class="label">UV Index:</span> <span class="value">{{ weather.current.uv }}</span>
				</p>
				<p>
					<span class="label">Wind:</span> <span class="value">{{ weather.current.wind_mph }} mph</span>
				</p>
				<p>
					<span class="label">Feels Like:</span> <span class="value">
						{{ weather.current['feelslike_' + currentSystem] }} °F
					</span>
				</p>
			</div>
			<div class="today-description">
				<p>{{ dayOfWeek + " " + timeOnly }}</p>
				<p>{{ weather.current.condition.text }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.today-percents p {
	display: flex;
	align-items: center;
	margin: 0.3em 0;
}

.today-percents .label {
	display: inline-block;
	width: 80px; /* adjust the width to suit your design */
	font-weight: bold;
}
.notSelected {
	color: rgb(130, 129, 129);
}
</style>
