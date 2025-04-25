<script setup>
import { computed } from 'vue';

const props = defineProps({
  day: {
    type: Object,
    required: true
  }
})

const dayOfWeek = computed(() => {
  const localDate = new Date(props.day.date);
  return localDate.toLocaleDateString('en-US', { weekday: 'short' });
})
</script>


<template>
   
   <div class="forecast-day">
      <p class="">{{ dayOfWeek }}</p>
      <img :src="day.day.condition.icon" :alt="`Weather icon for ${day.day.condition.text} weather`" />
      <p class="forecast-temp">
         <span class="max-temp">{{ day.day.maxtemp_f }}°</span>
         <span class="min-temp">{{ day.day.mintemp_f }}°</span>
      </p>
   </div>

</template>