 const RAIN_CODES = [61, 63, 65, 80, 81, 82];
 const STORM_CODES = [95, 96, 99];
 const CLOUDY_CODES = [1, 2, 3];
 const CLEAR_CODES = [0]

export const isRaining = (code: number) => RAIN_CODES.includes(code);
export const isStormy = (code: number) => STORM_CODES.includes(code);
export const isCloudy = (code: number) => CLOUDY_CODES.includes(code);
export const isClear = (code: number) => CLEAR_CODES.includes(code);

export const weatherInfoMap: Record<number, { emoji: string; label: string }> = {
   0: { label: "Clear sky", emoji: "☀️" },
  1: { label: "Mostly clear", emoji: "🌤️" },
  2: { label: "Partly cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  61: { label: "Rain", emoji: "🌧️" },
  80: { label: "Rain showers", emoji: "🌦️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
};