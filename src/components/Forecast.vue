<script setup>
import ForecastDay from "./ForecastDay.vue";
import { ref, computed } from "vue";

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

function handleNewDayHourly(index) {
   selectedDay.value = index;
   emit("newDayHourly", index);
}

const forecastDisplayDays = computed(() => {
   return props.forecast.forecast.forecastday.slice(0,-1);
});

</script>

<template>
   <h2>Forecast</h2>
   <div class="forecast">
      <template v-for="(day, index) in forecastDisplayDays" :key="index">
			<ForecastDay 
            class="forecast-day" 
            :day="day" 
            :class="(index === selectedDay) ? 'selected' : ''"
            :system="system"
            @newDayHourly="() => handleNewDayHourly(index)" />
		</template>
	</div>
</template>
