<script setup>
import { ref, watch } from 'vue'

// Creates an event when searched
const emit = defineEmits(['search'])
// Creates a variable to hold the search value
const search = ref('')
const error = ref(null);

const searchedCity = sessionStorage.getItem('searchedCity');

// Function to search for a city
function searchCity() {
   // Checks if the search value is empty
   if (search.value.trim() === '') {
      // Sets the error message
      error.value = 'Please enter a city name'

      // If empty, returns early
      return
   }
   // Clean up input
   search.value = search.value.trim()
   search.value = search.value.toLocaleLowerCase();
   search.value = search.value.charAt(0).toUpperCase() + search.value.slice(1)
   // Emits the search event with the search value
   emit('search', search.value)

   sessionStorage.setItem('searchedCity', search.value);
   // Clears the search input
   search.value = ''
   // Clears the error message
   error.value = null
}

</script>

<template>
<div class="search">
   <h1>Weather App</h1>
   <p v-if="error" class="error">{{ error }}</p>
</div>
	<label>
		<input type="text" v-model="search" placeholder="Search for a city..." />
	</label>
   <button @click="searchCity">
      Search
   </button>
</template>
