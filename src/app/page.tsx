"use client";

import { useState } from "react";

type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch("/api/weather");
      const data = await response.json();
      setWeather(data);
      console.log("Weather Data:", data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">How is the weather today?</h1>

        <button
          onClick={fetchWeather}
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition cursor-pointer"
        >
          Check Weather
        </button>

        {weather && (
          <div className="space-y-1">
            <p>🌡️ {weather.temperature}°C</p>
            <p>💨 {weather.windspeed} km/h</p>
            <p>🌦️ Code: {weather.weathercode}</p>
          </div>
        )}
      </div>
    </main>
  );
}
