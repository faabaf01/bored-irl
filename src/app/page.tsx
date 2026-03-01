"use client";

import {
  isClear,
  isRaining,
  getWeatherInfo,
  isFoggy,
  isStormy,
  isSnowing,
  isDrizzling,
  isCloudy,
} from "@/lib/weather";
import { LOCATIONS } from "@/lib/locations";
import { useEffect, useState } from "react";

type WeatherData = {
  time: string;
  temperature: number;
  windspeed: number;
  weathercode: number;
  is_day: number;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>(LOCATIONS[0].name);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    const selected = LOCATIONS.find((l) => l.name === location);
    if (!selected) return;
    try {
      setLoading(true);
      const response = await fetch(
        `/api/weather?latitude=${selected.latitude}&longitude=${selected.longitude}`,
      );
      const data = await response.json();
      setWeather(data);
      setLastUpdated(new Date());
      console.log("Weather Data:", data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lastUpdated) return;

    const interval = setInterval(() => {
      setLastUpdated((prev) => (prev ? new Date(prev) : null));
    }, 60000); // every 60 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [lastUpdated]);

  function timeAgo(date: Date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }
  function formatDateTime(iso: string) {
    const date = new Date(iso);

    return {
      date: date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  const formatted = formatDateTime(weather?.time || "");

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-100 to-blue-400">
        <div className="w-full max-w-xl space-y-6 text-center">
          <h1 className="text-2xl font-bold">How is the weather today?</h1>
          <div className="px-4 py-2 bg-white rounded-lg shadow-md">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-50 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {LOCATIONS.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>

            <button
              onClick={fetchWeather}
              className="ml-4 px-6 py-2 bg-cyan-600 text-white rounded-full font-bold hover:bg-cyan-500 transition cursor-pointer"
            >
              Check Weather
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {lastUpdated && (
            <p className="text-xs text-gray-500">
              Updated {timeAgo(lastUpdated)}
            </p>
          )}

          <div className="relative">
            <div
              className={`transition-opacity duration-500 absolute inset-0 ${
                loading ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <WeatherSkeleton />
            </div>
            <div
              className={`transition-opacity duration-400 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
            >
              {weather && (
                <>
                  <div className="text-gray-600">
                    {formatted.date}
                    <br />
                    {formatted.time}
                  </div>
                  <div className="py-4">
                    <div className="text-7xl">
                      {getWeatherInfo(weather.weathercode)?.emoji}
                    </div>
                    <div className="text-xl font-semibold">
                      {getWeatherInfo(weather.weathercode)?.label}
                    </div>
                  </div>

                  <div className="pb-4">
                    {isRaining(weather.weathercode) && (
                      <p className="text-gray-600">
                        Don&apos;t forget your umbrella!
                      </p>
                    )}
                    {isClear(weather.weathercode) && (
                      <p className="text-gray-600">It&apos;s a clear day!</p>
                    )}
                    {isFoggy(weather.weathercode) && (
                      <p className="text-gray-600">
                        It&apos;s foggy outside, drive safely!
                      </p>
                    )}
                    {isStormy(weather.weathercode) && (
                      <p className="text-gray-600">
                        There&apos;s a storm brewing, stay safe!
                      </p>
                    )}
                    {isSnowing(weather.weathercode) && (
                      <p className="text-gray-600">
                        Snow is falling, stay warm!
                      </p>
                    )}
                    {isDrizzling(weather.weathercode) && (
                      <p className="text-gray-600">
                        It&apos;s drizzling, a light rain is expected!
                      </p>
                    )}
                    {isCloudy(weather.weathercode) && (
                      <p className="text-gray-600">
                        It&apos;s cloudy, a calm day ahead!
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center transition hover:scale-105">
                      <span className="text-3xl mb-1">🌡️</span>
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="text-xl font-semibold">
                        {weather.temperature}°C
                      </p>
                    </div>

                    <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center transition hover:scale-105">
                      <span className="text-3xl mb-1">💨</span>
                      <p className="text-sm text-gray-500">Wind</p>
                      <p className="text-xl font-semibold">
                        {weather.windspeed} km/h
                      </p>
                    </div>

                    <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center transition hover:scale-105">
                      <span className="text-3xl mb-1">🌦️</span>
                      <p className="text-sm text-gray-500">Weather Code</p>
                      <p className="text-xl font-semibold">
                        {weather.weathercode}
                      </p>
                    </div>

                    <div
                      className={`rounded-xl ${weather.is_day === 1 ? "bg-yellow-100" : "bg-indigo-900 text-white"} shadow p-4 flex flex-col items-center justify-center transition hover:scale-105`}
                    >
                      <span className="text-3xl mb-1">
                        {weather.is_day === 1 ? "☀️" : "🌙"}
                      </span>
                      <p
                        className={`text-sm ${weather.is_day === 1 ? "text-gray-500" : "text-white"}`}
                      >
                        Day or Night
                      </p>
                      <p className="text-xl font-semibold">
                        {weather.is_day === 1 ? "Day" : "Night"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center text-gray-500 text-xs my-4">
        <p className="text-sm">Data provided by Open-Meteo API</p>
      </footer>
    </>
  );
}

function WeatherSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="mx-auto h-5 w-40 rounded bg-gray-200" />
      <div className="mx-auto h-5 w-10 rounded bg-gray-200" />

      {/* emoji */}
      <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />

      {/* label */}
      <div className="mx-auto h-5 w-30 rounded bg-gray-200" />

      {/* cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-white/70 shadow p-4">
            <div className="h-6 w-6 bg-gray-200 rounded mb-3 mx-auto" />
            <div className="h-3 w-16 bg-gray-200 rounded mx-auto mb-2" />
            <div className="h-4 w-12 bg-gray-200 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}