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

export default function Dashboard() {
  const [position, setPosition] = useState({ lat: 23.0225, lng: 72.5714 });
  const [warnings, setWarnings] = useState([
    'Accident reported near your location.',
    'Heavy traffic detected on Main Street.',
    'Severe weather alert: Heavy rain expected.',
    'Roadblock due to construction work.',
  ]);

  useEffect(() => {
    const updateLocation = (position) => {
      const newLocation = {
        lat: position.coords.latitude + Math.random() * 0.001,
        lng: position.coords.longitude + Math.random() * 0.001,
      };
      setPosition(newLocation);
    };

    const geoError = (error) => {
      console.error('Error getting location:', error.message);
    };

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(updateLocation, geoError);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const removeWarning = (index) => {
    setWarnings(warnings.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar Placeholder */}
      <header className="bg-blue-500 text-white py-4 px-6 shadow-md">
        <h1 className="text-xl font-semibold">User Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex px-6 py-4 gap-6">
        {/* Warning Section (Conditionally Rendered) */}
        {warnings.length > 0 && (
          <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">Warnings</h2>
            <ul className="space-y-4">
              {warnings.map((warning, index) => (
                <li
                  key={index}
                  className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex justify-between items-center hover:bg-red-100 hover:shadow-lg transition-all duration-300"
                >
                  <span>{warning}</span>
                  <button
                    className="text-red-700 hover:text-red-900"
                    onClick={() => removeWarning(index)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Map Section */}
        <div
          className={`${
            warnings.length > 0 ? 'w-2/3' : 'w-full'
          } bg-white p-4 rounded-lg shadow-lg border border-blue-200 transition-all duration-300`}
        >
          <h2 className="text-lg font-semibold text-blue-600 mb-4">Location Map</h2>
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={13}
            className={`h-[60vh] ${
              warnings.length > 0 ? 'w-[70%]' : 'w-[70%]'
            } mx-auto border border-gray-300 rounded-lg shadow-lg transition-all duration-300`}
          >
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
        </div>
      </div>
    </div>
  );
}