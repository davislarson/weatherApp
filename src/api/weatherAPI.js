const apiKey = "93be51d58e9644a5aa9160037252504";
const baseCurrentURL = "http://api.weatherapi.com/v1/current.json?key=" + apiKey;
const baseForecastURL = "http://api.weatherapi.com/v1/forecast.json?key=" + apiKey;

export async function getTodaysWeather(city) {
	let fullURL = baseCurrentURL + "&q=" + city + "&aqi=no";
	try {
		let response = await fetch(fullURL);
		let data = await response.json();
   	return data;
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		throw error;
	}
}

export async function getForecast(city) {
	let fullURL = baseForecastURL + "&q=" + city + "&days=9&aqi=no&alerts=no";
	try {
		let response = await fetch(fullURL);
		let data = await response.json();
		return data;
	}
	catch (error) {
		console.error("Error fetching weather data: ", error);
		throw error;
	}
}

