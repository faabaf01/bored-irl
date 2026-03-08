export type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    date: string;
    tempMax: number;
    tempMin: number;
    uvIndexMax: number;
    daylightDuration: number;
    weatherCode: number;
  }[];
};