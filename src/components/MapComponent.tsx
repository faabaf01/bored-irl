'use client';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Import compatibility CSS
import 'leaflet-defaulticon-compatibility'; // Import compatibility JS
import { LOCATIONS } from "@/lib/locations";

const MapComponent = () => {
    const position: [number, number] = [37.5665, 126.978];
    
    return (
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {LOCATIONS.map((location) => (
          <Marker
            key={location.name}
            position={[location.latitude, location.longitude]}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
    };

export default MapComponent;