// ─── Handle OpenWeatherMap API Errors ────────────────────────
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  // Axios errors from OpenWeatherMap
  if (err.response) {
    const status = err.response.status;
    const owmMessage = err.response.data?.message || 'Unknown API error';

    if (status === 401) {
      return res.status(401).json({
        error: 'Invalid API key. Please check your OPENWEATHER_API_KEY in .env',
      });
    }
    if (status === 404) {
      return res.status(404).json({
        error: `City not found: "${owmMessage}". Try a different city name.`,
      });
    }
    if (status === 429) {
      return res.status(429).json({
        error: 'Too many requests. Free tier allows 60 calls/minute.',
      });
    }
    return res.status(status).json({ error: owmMessage });
  }

  // Network / connection errors
  if (err.request) {
    return res.status(503).json({
      error: 'Cannot reach OpenWeatherMap API. Check your internet connection.',
    });
  }

  // Generic errors
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
}

module.exports = errorHandler;
