const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ─── Helper ───────────────────────────────────────────────────
function buildParams(extra = {}) {
  return { appid: API_KEY, units: 'metric', ...extra };
}

// ─── Current Weather by City Name ────────────────────────────
async function getCurrentWeatherByCity(city) {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: buildParams({ q: city }),
  });
  return formatCurrentWeather(response.data);
}

// ─── Current Weather by Coordinates (Geolocation) ────────────
async function getCurrentWeatherByCoords(lat, lon) {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: buildParams({ lat, lon }),
  });
  return formatCurrentWeather(response.data);
}

// ─── 5-Day Forecast by City ───────────────────────────────────
async function getForecastByCity(city) {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: buildParams({ q: city }),
  });
  return formatForecast(response.data);
}

// ─── 5-Day Forecast by Coordinates ───────────────────────────
async function getForecastByCoords(lat, lon) {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: buildParams({ lat, lon }),
  });
  return formatForecast(response.data);
}

// ─── City Search / Autocomplete ───────────────────────────────
async function searchCities(query) {
  const response = await axios.get(`${GEO_URL}/direct`, {
    params: { q: query, limit: 5, appid: API_KEY },
  });
  return response.data.map((city) => ({
    name: city.name,
    country: city.country,
    state: city.state || null,
    lat: city.lat,
    lon: city.lon,
    displayName: [city.name, city.state, city.country].filter(Boolean).join(', '),
  }));
}

// ─── Formatters ───────────────────────────────────────────────
function formatCurrentWeather(data) {
  return {
    city: data.name,
    country: data.sys.country,
    coordinates: { lat: data.coord.lat, lon: data.coord.lon },
    temperature: {
      current: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
    },
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind: {
      speed: data.wind.speed,
      direction: data.wind.deg,
    },
    visibility: data.visibility ? Math.round(data.visibility / 1000) : null, // km
    weather: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    },
    sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
    sunset: new Date(data.sys.sunset * 1000).toISOString(),
    timezone: data.timezone,
    timestamp: new Date(data.dt * 1000).toISOString(),
  };
}

function formatForecast(data) {
  // Group 3-hour intervals into daily summaries
  const dailyMap = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyMap[date]) {
      dailyMap[date] = { temps: [], icons: [], descriptions: [], items: [] };
    }
    dailyMap[date].temps.push(item.main.temp);
    dailyMap[date].icons.push(item.weather[0].icon);
    dailyMap[date].descriptions.push(item.weather[0].description);
    dailyMap[date].items.push(item);
  });

  const dailyForecast = Object.entries(dailyMap).map(([date, day]) => ({
    date,
    temperature: {
      min: Math.round(Math.min(...day.temps)),
      max: Math.round(Math.max(...day.temps)),
      avg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
    },
    weather: {
      description: day.descriptions[Math.floor(day.descriptions.length / 2)],
      icon: day.icons[Math.floor(day.icons.length / 2)],
      iconUrl: `https://openweathermap.org/img/wn/${day.icons[Math.floor(day.icons.length / 2)]}@2x.png`,
    },
    humidity: Math.round(
      day.items.reduce((a, b) => a + b.main.humidity, 0) / day.items.length
    ),
    windSpeed: Math.round(
      day.items.reduce((a, b) => a + b.wind.speed, 0) / day.items.length
    ),
  }));

  return {
    city: data.city.name,
    country: data.city.country,
    coordinates: { lat: data.city.coord.lat, lon: data.city.coord.lon },
    forecast: dailyForecast,
  };
}

module.exports = {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
  searchCities,
};
