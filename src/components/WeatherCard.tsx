import React from 'react'
import { motion } from "motion/react";

type WeatherCardProps = {
  icon: string;
  label: string;
  value?: string | number;
  isNight?: boolean;
};
const WeatherCard = ({ icon, label, value, isNight }: WeatherCardProps) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center rounded-xl p-3 
      }`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.8 }}
      variants={{
        offscreen: {
          opacity: 0,
          y: 150,
          scale: 0.8,
        },
        onscreen: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <span className="text-3xl mb-1">{icon}</span>

      <p className={`text-sm ${isNight ? "text-white/80" : "text-gray-500"}`}>
        {label}
      </p>

      <p className="text-xl font-semibold">{value}</p>
    </motion.div>
  );
};

export default WeatherCard