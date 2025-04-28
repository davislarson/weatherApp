<script setup>
import { ref, computed } from "vue";
import Hour from "./Hour.vue";
const props = defineProps({
	hourlyForecast: {
		type: Array,
		required: true,
	},
	system: {
		type: String
	}
});

const dayOfWeek = computed(() => {
	const localTimeISO = props.hourlyForecast[0].time.replace(" ", "T");
	const localDate = new Date(localTimeISO);
	return localDate.toLocaleDateString("en-US", { weekday: "long" });
});

const currentHour = new Date().getHours();
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
				<Hour v-if="currentHour <= index" :hourData="hour" :system="system"/>
			</template>
		</div>
	</div>
</template>
