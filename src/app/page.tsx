"use client";

import { isClear, isRaining, weatherInfoMap } from "@/lib/weather";
import { LOCATIONS } from "@/lib/locations";
import { useState } from "react";

type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>(LOCATIONS[0].name);

  const fetchWeather = async () => {
    const selected = LOCATIONS.find((l) => l.name === location);
    if (!selected) return;
    try {
      const response = await fetch(
        `/api/weather?latitude=${selected.latitude}&longitude=${selected.longitude}`,
      );
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

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          {LOCATIONS.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>

        <button
          onClick={fetchWeather}
          className="px-6 py-3 bg-cyan-600 text-white rounded-full font-bold hover:bg-cyan-500 transition cursor-pointer"
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

        {weather && (
          <>
            <p>{weatherInfoMap[weather.weathercode]?.label}</p>
            <p>{weatherInfoMap[weather.weathercode]?.emoji}</p>
            {isRaining(weather.weathercode) && (
              <p>Don&apos;t forget your umbrella!</p>
            )}
            {isClear(weather.weathercode) && (
              <p>It&apos;s a clear day! Enjoy the sunshine!</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
