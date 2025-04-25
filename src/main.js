import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

//A weather app delves deeper into working with APIs and displaying dynamic content. 
// Users enter a location, and the app retrieves weather data to showcase current conditions, forecasts, and potentially even weather icons.
// Key Features
   // Allow users to enter a location (city or zip code) for weather data retrieval.
   // Integrate your application with weather API and use it for retrieving current conditions as well as forecasts.
   // Show the current temperature, Conditions such as sunny or rainy weather, and perhaps an icon representing the weather.
   // Showcase the weather forecast for upcoming days, potentially using a list or a table format.
   // Consider implementing functionalities to display additional weather data points like wind speed, humidity, or UV index.