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
    name: "Ampang",
    latitude: 3.1417,
    longitude: 101.7278,
    country: "Malaysia",
  },
  {
    name: "Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
    country: "Japan",
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
    name: "Daegu",
    latitude: 35.8722,
    longitude: 128.6025,
    country: "South Korea",
  },
  {
    name: "Medina",
    latitude: 24.5247,
    longitude: 39.5692,
    country: "Saudi Arabia",
  },
  {
    name: "Mecca",
    latitude: 21.3891,
    longitude: 39.8579,
    country: "Saudi Arabia",
  },
];