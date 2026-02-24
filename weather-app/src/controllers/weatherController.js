const weatherService = require('../services/weatherService');

// ─── GET /api/weather/current?city=London ─────────────────────
async function getCurrentWeather(req, res, next) {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: 'Please provide either a city name or lat/lon coordinates.',
        examples: [
          '/api/weather/current?city=London',
          '/api/weather/current?lat=51.5&lon=-0.12',
        ],
      });
    }

    const data = city
      ? await weatherService.getCurrentWeatherByCity(city)
      : await weatherService.getCurrentWeatherByCoords(lat, lon);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── GET /api/weather/forecast?city=London ────────────────────
async function getForecast(req, res, next) {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: 'Please provide either a city name or lat/lon coordinates.',
      });
    }

    const data = city
      ? await weatherService.getForecastByCity(city)
      : await weatherService.getForecastByCoords(lat, lon);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── GET /api/weather/search?q=Lon ────────────────────────────
async function searchCities(req, res, next) {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters.' });
    }

    const data = await weatherService.searchCities(q.trim());
    res.json({ success: true, results: data.length, data });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCurrentWeather, getForecast, searchCities };
