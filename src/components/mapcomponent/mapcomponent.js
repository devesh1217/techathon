'use client';

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

export default function MapComponent() {
  const [position, setPosition] = useState({ lat: 23.0225, lng: 72.5714 });

  useEffect(() => {
    // Function to update the location
    const updateLocation = (position) => {
      const newLocation = {
        lat: position.coords.latitude + Math.random() * 0.0001,
        lng: position.coords.longitude + Math.random() * 0.0001,
        // lat: position.coords.latitude ,
        // lng: position.coords.longitude ,
      };
      console.log('New location:', newLocation);
      setPosition(newLocation);
    };

    const geoError = (error) => {
      console.error('Error getting location:', error.message);
    };

    // Refresh every 1 second (1000 milliseconds)
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(updateLocation, geoError);
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval); // Clear the interval
    };
  }, []);

  return (
    <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '100vh', width: '100%' }}>
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