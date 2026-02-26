export type Location = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export const LOCATIONS: Location[] = [
  {
    name: "Kuala Lumpur",
    latitude: 3.139,
    longitude: 101.6869,
    country: "Malaysia",
  },
  {
    name: "Hokkaido",
    latitude: 43.0642,
    longitude: 141.3469,
    country: "Japan",
  },
  {
    name: "New York City",
    latitude: 40.7128,
    longitude: -74.006,
    country: "USA",
  },
  {
    name: "Seoul",
    latitude: 37.5665,
    longitude: 126.978,
    country: "South Korea",
  },
  {
    name: "Medina",
    latitude: 24.5247,
    longitude: 39.5692,
    country: "Saudi Arabia",
  },
];