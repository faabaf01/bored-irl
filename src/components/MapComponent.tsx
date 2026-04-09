'use client';
import L from "leaflet";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Import compatibility CSS
import 'leaflet-defaulticon-compatibility'; // Import compatibility JS
import { LOCATIONS } from "@/lib/locations";
import { useEffect } from "react";
import { MapProps } from "@/app/page";

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

const MapComponent = ({ onSelectLocation, selectedLocation }: MapProps) => {
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
        return (
          <Marker
            key={loc.name}
            position={[loc.latitude, loc.longitude]}
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