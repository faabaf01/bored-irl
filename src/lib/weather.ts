const RAIN_CODES = [61, 63, 65, 80, 81, 82];
const STORM_CODES = [95, 96, 99];
const CLOUDY_CODES = [1, 2, 3];
const CLEAR_CODES = [0];

export const isRaining = (code: number) => RAIN_CODES.includes(code);
export const isStormy = (code: number) => STORM_CODES.includes(code);
export const isCloudy = (code: number) => CLOUDY_CODES.includes(code);
export const isClear = (code: number) => CLEAR_CODES.includes(code);

export function getWeatherInfo(code: number) {
  if (code === 0) return { label: "Clear sky", emoji: "☀️" };

  if ([1, 2].includes(code)) return { label: "Partly cloudy", emoji: "⛅" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };

  if ([45, 48].includes(code)) return { label: "Foggy", emoji: "🌫️" };

  if ([51, 53, 55].includes(code)) return { label: "Rain", emoji: "🌧️" };

  if ([56, 57].includes(code))
    return { label: "Freezing drizzle", emoji: "🌧️" };

  if ([61, 63, 65].includes(code))
    return { label: "Light to moderate rain", emoji: "🌦️" };

  if ([66, 67].includes(code)) return { label: "Freezing rain", emoji: "🌧️" };

  if ([71, 73, 75].includes(code)) return { label: "Snow fall", emoji: "🌨️" };

  if ([77].includes(code)) return { label: "Snow grains", emoji: "🌨️" };

  if ([80, 81, 82].includes(code))
    return { label: "Rain showers", emoji: "🌦️" };

  if ([85, 86].includes(code)) return { label: "Snow showers", emoji: "🌨️" };

  if ([95, 96, 99].includes(code))
    return { label: "Thunderstorm", emoji: "⛈️" };

  return { label: "Unknown weather", emoji: "❓" };
}
