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
import { Location, LOCATIONS } from "@/lib/locations";
import { useEffect, useState } from "react";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "@/types/weatherDataTypes";
import dynamic from "next/dynamic";
import Loading from "./loading";

export interface MapProps {
  onSelectLocation: (loc: Location) => void;
}

// type SelectedLocation = {
//   name: string;
//   lat: number;
//   long: number;
// };

// Dynamically import the MapComponent with SSR disabled
const DynamicMap = dynamic<MapProps>(
  () => import("@/components/MapComponent"),
  { ssr: false, loading: () => <Loading /> },
);

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async ({ lat, long }: { lat: number; long: number }) => {
    // const selected = LOCATIONS.find((l) => l.name === location);
    // if (!selected) return;
    try {
      setLoading(true);
      const response = await fetch(
        `/api/weather?latitude=${lat}&longitude=${long}`,
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

  useEffect(() => {
    if (!selectedLocation) return;
    fetchWeather({
      lat: Number(selectedLocation.latitude),
      long: Number(selectedLocation.longitude),
    });
  }, [selectedLocation]);

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

  function getBackgroundGradient() {
    const code = weather?.current?.weather_code;
    if (code === undefined) return "app-gradient-default";
    if (isRaining(code)) return "app-gradient-rainy";
    if (isStormy(code)) return "app-gradient-stormy";
    if (isCloudy(code)) return "app-gradient-cloudy";
    if (isClear(code)) return "app-gradient-sunny";
    if (isSnowing(code)) return "app-gradient-snowy";
    if (isDrizzling(code)) return "app-gradient-drizzle";

    return "app-gradient-default";
  }

  const handleSetLocation = (loc: Location) => {
    setSelectedLocation(loc);
    fetchWeather({ lat: loc.latitude, long: loc.longitude });
  };

  const formatted = formatDateTime(weather?.current?.time || "");
  const isNight = weather?.current?.is_day === 0;
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-200 to-blue-400">
        <div className="w-full px-8 space-y-6 text-center my-10">
          <p className={`${getBackgroundGradient()} text-2xl font-bold`}>
            How is the weather today?
          </p>
          {/* <div className="px-4 py-2 bg-white/20 backdrop-blur-sm sticky top-0 z-100 rounded-lg shadow-md">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-60 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              {LOCATIONS.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>

            <button
              onClick={fetchWeather}
              className="ml-4 px-6 py-2 bg-blue-300 text-white rounded-full font-bold hover:bg-pink-300 transition cursor-pointer"
            >
              Check Weather
            </button>
          </div> */}

          <div className="">
            <DynamicMap onSelectLocation={handleSetLocation} />
          </div>
          {lastUpdated && (
            <p className="text-xs text-gray-500">
              Updated {timeAgo(lastUpdated)} • Data refreshes every 15 minutes
            </p>
          )}

          {selectedLocation && (
            <p className="text-lg font-semibold">📍 {selectedLocation.name}</p>
          )}

          {error && <p className="text-red-500">{error}</p>}

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
                    <div className="text-7xl hover:scale-110 transition-transform">
                      {getWeatherInfo(weather.current?.weather_code)?.emoji}
                    </div>
                    <div className="text-xl font-semibold">
                      {getWeatherInfo(weather.current?.weather_code)?.label}
                    </div>
                  </div>

                  <div className="pb-4">
                    {isRaining(weather.current?.weather_code) && (
                      <p className="text-gray-600">
                        Don&apos;t forget your umbrella!
                      </p>
                    )}
                    {isClear(weather.current?.weather_code) && (
                      <p className="text-gray-600">It&apos;s a clear day!</p>
                    )}
                    {isFoggy(weather.current?.weather_code) && (
                      <p className="text-gray-600">
                        It&apos;s foggy outside, drive safely!
                      </p>
                    )}
                    {isStormy(weather.current?.weather_code) && (
                      <p className="text-gray-600">
                        There&apos;s a storm brewing, stay safe!
                      </p>
                    )}
                    {isSnowing(weather.current?.weather_code) && (
                      <p className="text-gray-600">
                        Snow is falling, stay warm!
                      </p>
                    )}
                    {isDrizzling(weather.current?.weather_code) && (
                      <p className="text-gray-600">
                        There&apos;s nothing more peaceful than a slow, drizzly
                        day.
                      </p>
                    )}
                    {isCloudy(weather.current?.weather_code) && (
                      <p className="text-gray-600">
                        It&apos;s cloudy, a calm day ahead!
                      </p>
                    )}
                  </div>

                  <div
                    className={`grid grid-cols-2 sm:grid-cols-4 rounded-xl py-4 gap-4 ${
                      isNight
                        ? "bg-blue-800/20 backdrop-blur-md shadow-md ring-1 ring-white/10"
                        : "bg-white/20 backdrop-blur-md shadow-md ring-1 ring-black/5 text-gray-800"
                    }`}
                  >
                    <WeatherCard
                      icon="🌡️"
                      label="Temperature"
                      value={`${weather.current?.temperature_2m}°C`}
                      isNight={isNight}
                    />

                    <WeatherCard
                      icon="💨"
                      label="Wind"
                      value={`${weather.current?.wind_speed_10m} km/h`}
                      isNight={isNight}
                    />

                    <WeatherCard
                      icon="🌦️"
                      label="Weather Code"
                      value={weather.current?.weather_code ?? ""}
                      isNight={isNight}
                    />

                    <WeatherCard
                      icon={weather.current?.is_day === 1 ? "☀️" : "🌙"}
                      label="Day or Night"
                      value={weather.current?.is_day === 1 ? "Day" : "Night"}
                      isNight={isNight}
                    />
                  </div>
                  <div className="my-8 max-w-full">
                    <h1 className="text-2xl font-bold mb-2 px-4">
                      Daily Weather
                    </h1>
                    <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-thin scrollbar-thumb-gray-300 snap-x snap-mandatory scroll-smooth">
                      {weather.daily?.map((day, index) => (
                        <div
                          key={index}
                          className="max-w-48 rounded-xl bg-white/20 backdrop-blur-md shadow-lg p-4 flex flex-col justify-start transition hover:scale-105 ring-1 ring-black/5 snap-start"
                        >
                          <p className="text-sm text-gray-500">
                            {index === 0
                              ? "Today • "
                              : index === 1
                                ? "Tomorrow • "
                                : ""}
                            {formatDateTime(day.date).date}
                          </p>
                          <div className="text-5xl my-2">
                            {getWeatherInfo(day.weatherCode)?.emoji}
                          </div>
                          <p className="text-sm text-gray-500">
                            {getWeatherInfo(day.weatherCode)?.label}
                          </p>
                          <div className="flex flex-row space-x-4 mt-2">
                            <p className="text-lg font-semibold">
                              ↑ {day.tempMax ? day.tempMax.toFixed(1) : "-"}°C
                            </p>
                            <p className="text-lg font-semibold">
                              ↓ {day.tempMin ? day.tempMin.toFixed(1) : "-"}°C
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center text-pink-800 text-xs my-4">
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