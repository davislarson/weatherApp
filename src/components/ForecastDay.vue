<script setup>
import { computed } from "vue";

const props = defineProps({
	day: {
		type: Object,
		required: true,
	},
	system: {
		type: String,
	},
});
const emit = defineEmits(["newDayHourly"]);

const currentDay = new Date().toLocaleDateString("en-US", { day: "numeric" });

const dayOfWeek = computed(() => {
	const localDate = new Date(props.day.date + "T00:00:00");
	const forecastDayNumeric = localDate.toLocaleDateString("en-US", { day: "numeric" });
	const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });
	return forecastDayNumeric === currentDay ? 'Today' : weekday;
});
</script>

<template>
	<div class="forecast-day" @click="$emit('newDayHourly')" title="Click to see hourly forecast">
		<p>{{ dayOfWeek }}</p>
		<img :src="day.day.condition.icon" :alt="`Weather icon for ${day.day.condition.text} weather`" />
		<p class="forecast-temp">
			<span class="max-temp">{{ Math.round(day.day["maxtemp_" + system]) }}°</span>
			<span class="min-temp">{{ Math.round(day.day["mintemp_" + system]) }}°</span>
		</p>
	</div>
</template>

<style scoped>
.selected {
	background-color: rgb(68, 67, 67);
}
</style>
