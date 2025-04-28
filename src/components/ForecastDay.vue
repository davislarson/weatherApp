<script setup>
import { computed } from "vue";

const props = defineProps({
	day: {
		type: Object,
		required: true,
	},
});

const currentDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
const emit = defineEmits(["newDayHourly"]);

const dayOfWeek = computed(() => {
	const localDate = new Date(props.day.date + "T00:00:00");
	const weekday = localDate.toLocaleDateString("en-US", { weekday: "short" });
	return weekday === currentDay ? "Today" : weekday;
});

function chooseDay() {
	// Emit the newDayHourly event with the date
	emit("newDayHourly", props.day.hour);
}
</script>

<template>
	<div class="forecast-day" @click="chooseDay">
		<p>{{ dayOfWeek }}</p>
		<img :src="day.day.condition.icon" :alt="`Weather icon for ${day.day.condition.text} weather`" />
		<p class="forecast-temp">
			<span class="max-temp">{{ Math.round(day.day.maxtemp_f) }}°</span>
			<span class="min-temp">{{ Math.round(day.day.mintemp_f) }}°</span>
		</p>
	</div>
</template>
