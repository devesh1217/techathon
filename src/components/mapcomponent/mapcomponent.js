"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Example coordinates for a path in Ahmedabad
// const coordinates = Array.from({ length: 100 }, (_, i) => ({
//   lat: 23.0225 + i * 0.001,
//   lng: 72.5714 + i * 0.001,
// }));

export default function MapComponent() {
  const [position, setPosition] = useState(coordinates[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPosition(coordinates[index]);
      index = (index + 1) % coordinates.length;
    }, 1000); // Change marker position every second

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[23.0225, 72.5714]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Latitude: {position.lat}, Longitude: {position.lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
}