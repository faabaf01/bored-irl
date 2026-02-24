// app/components/RandomActivity.tsx
import React from "react";

interface Activity {
  activity: string;
  type: string;
  participants: number;
}

const RandomActivity = async () => {
  const res = await fetch("https://bored-api.appbrewery.com/random");
  if (!res.ok) throw new Error("Failed to fetch activity");
  const data: Activity = await res.json();

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <h1 className="text-2xl font-bold">Activity Suggestion</h1>
      <p className="text-lg">Here is a random activity suggestion for you!</p>

      <div className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">{data.activity}</h2>
        <p className="mt-2">Type: {data.type}</p>
        <p className="mt-2">Participants: {data.participants}</p>
      </div>
    </div>
  );
};

export default RandomActivity;