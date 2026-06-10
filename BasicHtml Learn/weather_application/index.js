const weatherCodes = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Slight Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Violent Rain Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with Hail",
  99: "Severe Thunderstorm",
};

const weatherIcons = {
  "Clear Sky": "☀️",
  "Mainly Clear": "🌤️",
  "Partly Cloudy": "⛅",
  Overcast: "☁️",
  "Slight Rain": "🌧️",
  "Moderate Rain": "🌧️",
  "Heavy Rain": "🌧️",
  Thunderstorm: "⛈️",
  "Slight Snow": "❄️",
};

async function fetchWeather(latitude, longitude) {
  const result = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  );

  const data = await result.json();

  if (!data.current_weather) {
    throw new Error("Unable to fetch weather data");
  }

  return data;
}

function displayWeather(data, suffix = "") {
  const code = data.current_weather.weathercode;
  const weatherType = weatherCodes[code] || "Unknown";

  document.getElementById(`temperature${suffix}`).textContent =
    `Temperature: ${data.current_weather.temperature}°C`;

  document.getElementById(`windspeed${suffix}`).textContent =
    `Wind Speed: ${data.current_weather.windspeed} km/h`;

  document.getElementById(`weather-type${suffix}`).textContent =
    `Weather Type: ${weatherType}`;

  changeBackground(weatherType);
  document.getElementById(`weather-type${suffix}`).textContent =
    `${weatherIcons[weatherType] || "🌍"} ${weatherType}`;
}

async function getWeather() {
  try {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (!latitude || !longitude) {
      alert("Please enter both latitude and longitude.");
      return;
    }

    const data = await fetchWeather(latitude, longitude);

    displayWeather(data);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function getWeatherByCity() {
  try {
    const city = document.getElementById("city").value.trim();

    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const geocodingResult = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    );

    const geocodingData = await geocodingResult.json();

    if (!geocodingData.results || geocodingData.results.length === 0) {
      alert("City not found.");
      return;
    }

    const { latitude, longitude } = geocodingData.results[0];

    const weatherData = await fetchWeather(latitude, longitude);

    displayWeather(weatherData, "-city");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function changeBackground(weatherType) {
  let imageUrl = "";

  switch (weatherType) {
    case "Clear Sky":
    case "Mainly Clear":
      imageUrl =
        "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg";
      break;

    case "Partly Cloudy":
    case "Overcast":
      imageUrl =
        "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg";
      break;
    case "Fog":
    case "Depositing Fog":
      imageUrl =
        "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg";
      break;

    case "Light Drizzle":
    case "Moderate Drizzle":
    case "Dense Drizzle":
    case "Slight Rain":
    case "Moderate Rain":
    case "Heavy Rain":
    case "Rain Showers":
    case "Violent Rain Showers":
      imageUrl =
        "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80";
      break;

    case "Slight Snow":
    case "Moderate Snow":
    case "Heavy Snow":
      imageUrl =
        "https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg";
      break;

    case "Thunderstorm":
    case "Thunderstorm with Hail":
    case "Severe Thunderstorm":
      imageUrl =
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg";
      break;

    default:
      imageUrl =
        "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg";
  }

  document.body.style.background = `
    linear-gradient(
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.45)
    ),
    url('${imageUrl}')
  `;

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
}
