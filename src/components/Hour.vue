<script setup>
import { computed } from 'vue';

const props = defineProps({
  hourData: {
    type: Object,
    required: true
  },
   system: {
      type: String
   }
});

  const hourOnly = computed(() => {
	// time is expected to be in the format "YYYY-MM-DD HH:mm"
	const timePart = props.hourData.time.split(" ")[1]; // "HH:mm"
	const hour24 = parseInt(timePart.split(":")[0]);
	const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
	const period = hour24 >= 12 ? "PM" : "AM";
	return `${hour12} ${period}`;
})
</script>

<template>
   <div>
      <div class="hour">
         <p>{{ hourOnly }}</p>
         <img :src="hourData.condition.icon" :alt="`Weather icon for ${hourData.condition.text} weather`" />
         <p class="forecast-temp">
            <span class="max-temp">{{ Math.round(hourData['temp_' + system]) }}°</span>
         </p>
      </div>
   </div>
</template>