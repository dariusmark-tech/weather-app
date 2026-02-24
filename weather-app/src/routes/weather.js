const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast, searchCities } = require('../controllers/weatherController');
const errorHandler = require('../middleware/errorHandler');

// ─── Weather Endpoints ────────────────────────────────────────
// GET /api/weather/current?city=London
// GET /api/weather/current?lat=51.5&lon=-0.12
router.get('/current', getCurrentWeather);

// GET /api/weather/forecast?city=London
// GET /api/weather/forecast?lat=51.5&lon=-0.12
router.get('/forecast', getForecast);

// GET /api/weather/search?q=Lon
router.get('/search', searchCities);

// Error handler (must be last)
router.use(errorHandler);

module.exports = router;
