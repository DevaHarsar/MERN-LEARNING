async function getWeather() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await result.json();
    if(!data.current_weather) {
        alert('Unable to fetch weather data. Please check the coordinates and try again.');
        return;
    }
    document.getElementById('temperature').textContent = `Temperature: ${data.current_weather.temperature}°C`;
    document.getElementById('windspeed').textContent = `Wind Speed: ${data.current_weather.windspeed} km/h`;
}


async function getWeatherByCity() {
    const city = document.getElementById('city').value;
    const geocodingResult = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geocodingData = await geocodingResult.json(); 
    if (!geocodingData.results || geocodingData.results.length === 0) {
        alert('City not found. Please check the city name and try again.');
        return;
    }
    const { latitude, longitude } = geocodingData.results[0];
    const weatherResult = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherResult.json();
    if (!weatherData.current_weather) {
        alert('Unable to fetch weather data. Please try again.');
        return;
    }
    console.log(weatherData);
    document.getElementById('temperature-city').textContent = `Temperature: ${weatherData.current_weather.temperature}°C`;
    document.getElementById('windspeed-city').textContent = `Wind Speed: ${weatherData.current_weather.windspeed} km/h`;
}