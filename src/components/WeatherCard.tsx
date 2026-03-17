import React from 'react'

type WeatherCardProps = {
  icon: string;
  label: string;
  value?: string | number;
  isNight?: boolean;
};
const WeatherCard = ({ icon, label, value, isNight }: WeatherCardProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl p-3 transition hover:scale-105
      }`}
    >
      <span className="text-3xl mb-1">{icon}</span>

      <p className={`text-sm ${isNight ? "text-white/80" : "text-gray-500"}`}>
        {label}
      </p>

      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
};

export default WeatherCard