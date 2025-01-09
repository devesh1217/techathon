"use client";
import React, { useState, useEffect } from "react";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0); // Current speed in km/h
  const [alert, setAlert] = useState(false); // Overspeeding alert
  const [gpsError, setGpsError] = useState(""); // Error message
  const [prevLocation, setPrevLocation] = useState(null); // Previous location data
  const [prevTimestamp, setPrevTimestamp] = useState(null); // Previous timestamp

  useEffect(() => {
    const calculateSpeed = (lat1, lon1, lat2, lon2, timeElapsed) => {
      const R = 6371; // Earth's radius in km
      const toRad = (deg) => (deg * Math.PI) / 180;

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.asin(Math.sqrt(a));
      const distance = R * c; // Distance in km

      const timeInHours = timeElapsed / 3600; // Convert seconds to hours
      return timeInHours > 0 ? distance / timeInHours : 0; // Speed in km/h
    };

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude," ",longitude);
      const currentTime = position.timestamp / 1000; // Convert timestamp to seconds

      if (prevLocation && prevTimestamp) {
        const timeElapsed = currentTime - prevTimestamp; // Time difference in seconds
        const calculatedSpeed = calculateSpeed(
          prevLocation.lat,
          prevLocation.lon,
          latitude,
          longitude,
          timeElapsed
        );
        setSpeed(calculatedSpeed.toFixed(2)); // Set the calculated speed
        setAlert(calculatedSpeed > 3); // Alert if speed > 3 km/h
      }

      setPrevLocation({ lat: latitude, lon: longitude });
      setPrevTimestamp(currentTime);
      setGpsError(""); // Clear any previous errors
    };

    const error = (err) => {
      if (err.code === 1) {
        setGpsError("Permission denied. Please enable location services.");
      } else if (err.code === 2) {
        setGpsError("Position unavailable. Check GPS or network.");
      } else if (err.code === 3) {
        setGpsError("Timeout expired. Try again in a better environment.");
      } else {
        setGpsError("An unknown error occurred.");
      }
      console.error("Geolocation Error:", err);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 30000, // 30 seconds
      maximumAge: 5000, // Use cached position for 5 seconds
    };

    // Automatically request location permissions
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error, options);
    } else {
      setGpsError("Geolocation is not supported by your browser.");
    }
  }, [prevLocation, prevTimestamp]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Speedometer</h1>
      {gpsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {gpsError}
        </div>
      ) : (
        <>
          <div className="text-lg mb-4">
            <span>Current Speed: </span>
            <span className={speed > 3 ? "text-red-600 font-bold" : "text-green-600"}>
              {speed} km/h
            </span>
          </div>
          {alert && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              ⚠️ Overspeeding Alert! Slow down.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Speedometer;
