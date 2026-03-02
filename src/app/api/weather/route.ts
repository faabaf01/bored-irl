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
    &daily=temperature_2m_max,temperature_2m_min,uv_index_max,daylight_duration
    &current=temperature_2m,is_day,wind_speed_10m,weather_code
    &timezone=auto
  `.replace(/\s+/g, "");
  // https://api.open-meteo.com/v1/forecast?
  // latitude=43.432&longitude=142.9347
  // &daily=temperature_2m_max,temperature_2m_min,uv_index_max,daylight_duration
  // &current=temperature_2m,is_day
  // &timezone=auto
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return new Response("Failed to fetch weather data", { status: 500 });
    }

    const data = await response.json();
    return Response.json({
      time: data.current.time,
      temperature_2m: data.current.temperature_2m,
      wind_speed_10m: data.current.wind_speed_10m,
      weather_code: data.current.weather_code,
      is_day: data.current.is_day,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response("Weather service is currently unavailable", {
      status: 500,
    });
  }
}
