import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if (!latitude || !longitude) {
    return new Response("Missing latitude or longitude", { status: 400 });
  }

  const url = `https://api.open-meteo.com/v1/forecast
    ?latitude=${latitude}
    &longitude=${longitude}
    &daily=temperature_2m_max,temperature_2m_min,uv_index_max,daylight_duration,weather_code
    &current=temperature_2m,is_day,wind_speed_10m,weather_code
    &timezone=auto
  `.replace(/\s+/g, "");

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return new Response("Failed to fetch weather data", { status: 500 });
    }

    const data = await response.json();

    const daily = data.daily.time.map((date: string, index: number) => ({
      date,
      tempMax: data.daily.temperature_2m_max[index],
      tempMin: data.daily.temperature_2m_min[index],
      uvIndexMax: data.daily.uv_index_max[index],
      daylightDuration: data.daily.daylight_duration[index],
      weatherCode: data.daily.weather_code[index],
    }));

    return Response.json({
      current: {
        time: data.current.time,
        temperature_2m: data.current.temperature_2m,
        wind_speed_10m: data.current.wind_speed_10m,
        weather_code: data.current.weather_code,
        is_day: data.current.is_day,
      },
      daily,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response("Weather service is currently unavailable", {
      status: 500,
    });
  }
}
