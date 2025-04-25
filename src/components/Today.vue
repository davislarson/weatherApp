<script setup>
import { computed } from "vue";

const props = defineProps({
	weather: {
		type: Object,
		required: true,
	},
});

const timeOnly = computed(() => {
	return props.weather.location.localtime.split(" ")[1];
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
			<h2>{{ weather.location.name }}</h2>
		</div>
		<div class="today-quick-items">
			<img
				:src="weather.current.condition.icon"
				:alt="`Weather icon for ${weather.current.condition.text} weather`"
			/>

			<div class="today-temp">
				<h3>{{ Math.round(weather.current.temp_f) }} °F | °C</h3>
			</div>

			<div class="today-percents">
				<p>
					<span class="label">Humidity:</span> <span class="value">{{ weather.current.humidity }}%</span>
				</p>
				<p>
					<span class="label">Precipitation:</span> <span class="value">{{ weather.current.precip_in }} in</span>
				</p>
				<p>
					<span class="label">UV Index:</span> <span class="value">{{ weather.current.uv }}</span>
				</p>
				<p>
					<span class="label">Wind:</span> <span class="value">{{ weather.current.wind_mph }} mph</span>
				</p>
				<p>
					<span class="label">Feels Like:</span> <span class="value">{{ weather.current.feelslike_f }} °F</span>
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
</style>
