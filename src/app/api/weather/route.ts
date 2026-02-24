export async function GET() {
    const latitude = 3.139;
    const longitude = 101.6869;

    const url = `https://api.open-meteo.com/v1/forecast
    ?latitude=${latitude}
    &longitude=${longitude}
    &current_weather=true
  `.replace(/\s+/g, "");

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        return new Response("Failed to fetch weather data", { status: 500})
    }

    const data = await response.json(); 
    return Response.json({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
    })
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response("Weather service is currently unavailable", { status: 500 })
  }
}