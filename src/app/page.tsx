"use client";

import { isClear, isRaining, weatherInfoMap } from "@/lib/weather";
import { LOCATIONS } from "@/lib/locations";
import { useState } from "react";

type WeatherData = {
  time: string;
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
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-100 to-blue-400">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">How is the weather today?</h1>
        <div className="px-4 py-2 bg-white rounded-lg shadow-md">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {LOCATIONS.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchWeather}
            className="ml-4 px-6 py-3 bg-cyan-600 text-white rounded-full font-bold hover:bg-cyan-500 transition cursor-pointer"
          >
            Check Weather
          </button>
        </div>

        {weather && (
          <>
            <span className="text-6xl">
              {weatherInfoMap[weather.weathercode]?.emoji}
            </span>
            <p className="text-xl font-semibold">
              {weatherInfoMap[weather.weathercode]?.label}
            </p>
            {isRaining(weather.weathercode) && (
              <p>Don&apos;t forget your umbrella!</p>
            )}
            {isClear(weather.weathercode) && (
              <p>It&apos;s a clear day! Enjoy the sunshine!</p>
            )}
          </>
        )}

        {weather && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
              <span className="text-3xl mb-1">🌡️</span>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-xl font-semibold">{weather.temperature}°C</p>
            </div>

            <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
              <span className="text-3xl mb-1">💨</span>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="text-xl font-semibold">{weather.windspeed} km/h</p>
            </div>

            <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
              <span className="text-3xl mb-1">🕐</span>
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-sm font-medium text-center">{weather.time}</p>
            </div>

            <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
              <span className="text-3xl mb-1">🌦️</span>
              <p className="text-sm text-gray-500">Weather Code</p>
              <p className="text-xl font-semibold">{weather.weathercode}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}