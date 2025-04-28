<script setup>
import { ref, onMounted } from 'vue'

// Creates an event when searched
const emit = defineEmits(['search'])
// Creates a variable to hold the search value
const search = ref('')
const error = ref(null);
const inputRef = ref(null);

onMounted(() => {
   if (inputRef.value) inputRef.value.focus();
})

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
   <div class="searchBar">
      <label class="searchLabel">
         <input ref="inputRef" type="text" v-model="search" placeholder="Search for a city..." @keyup.enter="searchCity"/>
      </label>
      <button class="searchButton" @click="searchCity">
         Search
      </button>
   </div>
</div>
</template>
