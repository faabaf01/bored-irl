import React from 'react'

type WeatherCardProps = {
  icon: string;
  label: string;
  value?: string | number;
  weather?: boolean;
}
const WeatherCard = ({ icon, label, value, weather }: WeatherCardProps) => {
  return (
     <div
      className={`rounded-xl shadow p-4 flex flex-col items-center justify-center transition hover:scale-105 ${
        weather ? "bg-indigo-900 text-white" : "bg-white"
      }`}
    >
      <span className="text-3xl mb-1">{icon}</span>

      <p className={`text-sm ${weather ? "text-white" : "text-gray-500"}`}>
        {label}
      </p>

      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}

export default WeatherCard