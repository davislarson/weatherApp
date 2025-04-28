<script setup>
import ForecastDay from "./ForecastDay.vue";
import { ref } from "vue";

const props = defineProps({
	forecast: {
		type: Object,
		required: true,
	},
   system: {
      type: String,
      required: true,
   },
});
const emit = defineEmits(["newDayHourly"]);
const selectedDay = ref(0);

function handleNewDayHourly(value, index) {
   selectedDay.value = index;
   emit("newDayHourly", value);
}

</script>

<template>
   <h2>Forecast</h2>
   <div class="forecast">
      <template v-for="(day, index) in forecast.forecast.forecastday" :key="index">
			<ForecastDay 
            class="forecast-day" 
            :day="day" 
            :class="(index === selectedDay) ? 'selected' : ''"
            :system="system"
            @newDayHourly="value => handleNewDayHourly(value, index)" />
		</template>
	</div>
</template>
