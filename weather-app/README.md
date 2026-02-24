# 🌤️ Weather App — Node.js + Express + OpenWeatherMap

A full-stack weather app with a clean frontend, RESTful API backend, and all 4 features:
- ✅ Current weather
- ✅ 5-day forecast
- ✅ Search by city (with autocomplete)
- ✅ Geolocation (auto-detect)

---

## 📁 Project Structure

```
weather-app/
├── public/
│   └── index.html          ← Frontend (HTML + CSS + JS)
├── src/
│   ├── server.js           ← Express entry point
│   ├── routes/
│   │   └── weather.js      ← API route definitions
│   ├── controllers/
│   │   └── weatherController.js  ← Request handlers
│   ├── services/
│   │   └── weatherService.js     ← OpenWeatherMap API calls
│   └── middleware/
│       └── errorHandler.js       ← Error handling
├── .env.example            ← Environment variable template
├── .gitignore
└── package.json
```

---

## 🚀 Setup (Step by Step)

### Step 1 — Get a FREE API Key
1. Go to https://openweathermap.org/
2. Sign up for a free account
3. Navigate to **API keys** tab
4. Copy your default API key (or generate a new one)
5. ⚠️ Note: New keys take ~2 hours to activate

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Configure Environment
```bash
cp .env.example .env
```
Open `.env` and paste your API key:
```
OPENWEATHER_API_KEY=paste_your_key_here
PORT=3000
```

### Step 4 — Start the Server
```bash
# Production
npm start

# Development (auto-restarts on changes)
npm run dev
```

### Step 5 — Open the App
Visit http://localhost:3000 in your browser 🎉

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/current?city=London` | Current weather by city |
| GET | `/api/weather/current?lat=51.5&lon=-0.12` | Current weather by coords |
| GET | `/api/weather/forecast?city=London` | 5-day forecast by city |
| GET | `/api/weather/forecast?lat=51.5&lon=-0.12` | 5-day forecast by coords |
| GET | `/api/weather/search?q=Lon` | City autocomplete search |

### Example Response — Current Weather
```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "temperature": {
      "current": 14,
      "feelsLike": 12,
      "min": 11,
      "max": 16
    },
    "humidity": 72,
    "wind": { "speed": 5.1, "direction": 240 },
    "weather": {
      "main": "Clouds",
      "description": "overcast clouds",
      "iconUrl": "https://openweathermap.org/img/wn/04d@2x.png"
    },
    "sunrise": "2024-01-15T07:59:00.000Z",
    "sunset": "2024-01-15T16:09:00.000Z"
  }
}
```

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| `401 Unauthorized` | API key is wrong or not yet activated (wait 2hrs) |
| `404 City not found` | Check spelling, try full city name |
| `Cannot connect to server` | Make sure `npm start` is running |
| Port already in use | Change `PORT` in `.env` to e.g. 3001 |

---

## 🧪 Test with curl
```bash
# Current weather
curl "http://localhost:3000/api/weather/current?city=Tokyo"

# 5-day forecast
curl "http://localhost:3000/api/weather/forecast?city=Paris"

# City search
curl "http://localhost:3000/api/weather/search?q=New"
```

---

## 📈 Next Steps / Ideas
- Add caching (node-cache or Redis) to save API calls
- Add unit toggle (°C / °F)
- Add hourly forecast
- Deploy to Railway, Render, or Heroku
- Add weather alerts
