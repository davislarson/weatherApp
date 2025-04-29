<script setup>
import { ref, computed } from "vue";
import Hour from "./Hour.vue";
const props = defineProps({
	hourlyForecast: {
		type: Array,
		required: true,
	},
	system: {
		type: String,
	},
	cityTime: {
		type: String,
	},
});

const dayOfWeek = computed(() => {
	if (!props.hourlyForecast || props.hourlyForecast.length === 0) {
		return "";
	}
	const localTimeISO = props.hourlyForecast[0].time.replace(" ", "T");
	const localDate = new Date(localTimeISO);
	return localDate.toLocaleDateString("en-US", { weekday: "long" });
});

const currentHour = props.cityTime.split(":")[0];
</script>

<template>
	<div class="hourly-section">
		<!-- Hourly forecast -->
		<div class="hourly-title">
			<h2>Hourly Forecast</h2>
			<p>{{ dayOfWeek }}</p>
		</div>

		<div class="hourly">
			<template v-for="(hour, index) in hourlyForecast" :key="index">
				<Hour v-if="currentHour <= index" :hourData="hour" :system="system" />
			</template>
		</div>
	</div>
</template>

<style scoped>
.hourly {
	display: flex;
	flex-wrap: nowrap; /* Ensure items are in a single row */
	overflow-x: auto; /* Enable horizontal scrolling */
	-webkit-overflow-scrolling: touch; /* Smoother scrolling on iOS devices */
	padding: 10px 0;
}
</style>
