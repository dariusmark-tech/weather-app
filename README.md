# 🌤️ Weather App - Real-Time Weather Dashboard

A beautiful, responsive weather application built with Node.js and Express that provides real-time weather data and forecasts using the OpenWeatherMap API.

## ✨ Features

- **Current Weather** - Get real-time weather conditions for any city
- **5-Day Forecast** - Plan ahead with detailed 5-day weather predictions
- **Smart Search** - Autocomplete city suggestions as you type
- **Geolocation** - One-click weather for your current location
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean, intuitive interface with weather icons

## 🚀 Live Demo

Check out the live demo: [Weather App Demo](https://your-demo-url.herokuapp.com)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier works perfectly)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Navigate to your dashboard and copy your API key
   - ⚠️ **Note:** New API keys take approximately 2 hours to activate

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3000
   ```

5. **Start the application**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📡 API Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /api/weather/current?city={city}` | Get current weather by city name | `/api/weather/current?city=London` |
| `GET /api/weather/current?lat={lat}&lon={lon}` | Get current weather by coordinates | `/api/weather/current?lat=51.51&lon=-0.13` |
| `GET /api/weather/forecast?city={city}` | Get 5-day forecast | `/api/weather/forecast?city=Paris` |
| `GET /api/weather/search?q={query}` | City autocomplete search | `/api/weather/search?q=Man` |

## 🏗️ Project Structure

```
weather-app/
├── public/
│   └── index.html          # Frontend UI
├── src/
│   ├── server.js           # Express server entry point
│   ├── routes/
│   │   └── weather.js      # API route definitions
│   ├── controllers/
│   │   └── weatherController.js
│   ├── services/
│   │   └── weatherService.js # OpenWeatherMap API calls
│   └── middleware/
│       └── errorHandler.js
├── .env.example             # Environment variables template
├── package.json
└── README.md
```

## 💻 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: OpenWeatherMap API
- **Development**: Nodemon, dotenv

## 🎯 Usage Examples

### Search for a city
Simply type a city name in the search box and select from autocomplete suggestions

### Use your location
Click the "📍 Use My Location" button to get weather for your current location

### Check forecast
After searching for a city, click the "5-Day Forecast" button to see future weather predictions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 📧 Contact


