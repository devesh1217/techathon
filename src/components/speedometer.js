'use client';

import { useEffect, useState } from 'react';

const readoutUnits = {
  mph: 2.23694, // Conversion factor from m/s to mph
  kmh: 3.6      // Conversion factor from m/s to km/h
};

const Speedometer = () => {
  const [readoutUnit, setReadoutUnit] = useState(readoutUnits.mph);
  const [speed, setSpeed] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Handle switching units
  const toggleUnits = (unit) => {
    setReadoutUnit(unit);
  };

  // Start or stop geolocation tracking
  const toggleTracking = () => {
    if (isTracking) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    } else {
      const options = { enableHighAccuracy: true };
      const id = navigator.geolocation.watchPosition(
        (position) => updateSpeed(position),
        (error) => console.error(error),
        options
      );
      setWatchId(id);
      setIsTracking(true);
    }
  };

  // Update speed reading and trigger alert
  const updateSpeed = (position) => {
    const { speed } = position.coords;
    const calculatedSpeed = speed !== null ? Math.round(speed * readoutUnit) : 0;
    setSpeed(calculatedSpeed);

    // Trigger alert if speed exceeds 3
    if (calculatedSpeed > 3) {
      alert(`Speed exceeded! Current speed: ${calculatedSpeed}`);
    }
  };

  // Ambient Light Sensor for Dark Mode
  useEffect(() => {
    if ('AmbientLightSensor' in window) {
      const sensor = new AmbientLightSensor({ frequency: 0.25 });
      sensor.addEventListener('reading', () => {
        setDarkMode(sensor.illuminance < 3);
      });
      sensor.start();
    }
  }, []);

  return (
    <div className={darkMode ? 'dark bg-black text-green-500' : 'bg-gray-100 text-black'}>
      <div className="text-center">
        <div id="readout" className="text-8xl font-bold">
          {speed} {readoutUnit === readoutUnits.mph ? 'mi/h' : 'km/h'}
        </div>
        <div className="mt-4">
          <button
            id="show-mph"
            className={`px-4 py-2 rounded-l ${readoutUnit === readoutUnits.mph ? 'bg-pink-500 text-white' : 'bg-white'}`}
            onClick={() => toggleUnits(readoutUnits.mph)}
          >
            mi/h
          </button>
          <button
            id="show-kmh"
            className={`px-4 py-2 rounded-r ${readoutUnit === readoutUnits.kmh ? 'bg-pink-500 text-white' : 'bg-white'}`}
            onClick={() => toggleUnits(readoutUnits.kmh)}
          >
            km/h
          </button>
        </div>
        <button
          id="start"
          className={`mt-4 px-6 py-2 rounded ${isTracking ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          onClick={toggleTracking}
        >
          {isTracking ? '🛑 Stop' : '🔑 Start'}
        </button>
      </div>
    </div>
  );
};

export default Speedometer;
