'use client';
import L from "leaflet";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Import compatibility CSS
import 'leaflet-defaulticon-compatibility'; // Import compatibility JS
import { LOCATIONS } from "@/lib/locations";
import { useEffect } from "react";
import { MapProps } from "@/app/page";
import { getWeatherInfo } from "@/lib/weather";

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = LOCATIONS.map((loc) => [loc.latitude, loc.longitude]);
    map.fitBounds(bounds as [number, number][]);
  }, [map]);

  return null;
}

function FlyToLocation({ lat, long }: { lat: number; long: number }) {
  const map = useMap();
  useEffect(() => {
    if (!lat || !long) return;

    map.flyTo([lat, long], 8);
  }, [map, lat, long]);

  return null;
}

function createWeatherIcon(emoji: string, temp?: number, isSelected?: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        font-size:20px;
        transform: ${isSelected ? "scale(1.3)" : "scale(1)"};
        filter: ${isSelected ? "drop-shadow(0 0 6px #000)" : "none"};
      ">
        <div>${emoji}</div>
        <div style="font-size:12px;">
          ${temp !== undefined ? `${temp.toFixed(1)}°` : "--"}
        </div>
      </div>
    `,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
}

const MapComponent = ({
  onSelectLocation,
  selectedLocation,
  locationsWeather,
}: MapProps) => {
  const position: [number, number] = [37.5665, 126.978];

  return (
    <MapContainer
      center={position}
      zoom={10} // Fitbounds will override this initial zoom
      style={{ height: "400px", width: "100%" }}
    >
      <FitBounds />
      {selectedLocation && (
        <FlyToLocation
          lat={selectedLocation.latitude}
          long={selectedLocation.longitude}
        />
      )}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {LOCATIONS.map((loc) => {
        const weather = locationsWeather[loc.name];
        const code = weather?.current?.weather_code ?? 0;
        const temp = weather?.current?.temperature_2m;
        const emoji = getWeatherInfo(code)?.emoji ?? "❓";
        const isSelected =
          selectedLocation?.latitude === loc.latitude &&
          selectedLocation?.longitude === loc.longitude;

        return (
          <Marker
            key={loc.name}
            position={[loc.latitude, loc.longitude]}
            icon={createWeatherIcon(emoji, temp, isSelected)}
            eventHandlers={{
              click: () => {
                onSelectLocation(loc);
              },
            }}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;