<script setup>
import ForecastDay from "./ForecastDay.vue";

const props = defineProps({
	forecast: {
		type: Object,
		required: true,
	},
});
const emit = defineEmits(["newDayHourly"]);
</script>

<template>
	<div class="forecast">
		<template v-for="(day, index) in forecast.forecast.forecastday" :key="index">
			<ForecastDay class="forecast-day" v-if="index !== 0" :day="day" @newDayHourly="emit('newDayHourly', $event)" />
		</template>
	</div>
</template>
