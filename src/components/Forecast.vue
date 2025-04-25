<script setup>
import ForecastDay from './ForecastDay.vue';

const props = defineProps({
	forecast: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="forecast">
		<div class="forecast">
         <ForecastDay 
            class="forecast-day" 
            v-for="(day, index) in forecast.forecast.forecastday" 
            :key="index" 
            :day="day" 
         />
      </div>
	</div>
</template>
