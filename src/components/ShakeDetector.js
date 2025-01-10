// components/ShakeDetector.js
'use client'

import { useEffect, useState } from 'react';

const ShakeDetector = () => {
  const [shakeDetected, setShakeDetected] = useState(false);
  const [acceleration, setAcceleration] = useState(0);
  let lastUpdate = 0;
  let x = 0, y = 0, z = 0;
  
  // Threshold for shake detection (can be adjusted based on sensitivity)
  const SHAKES_THRESHOLD = 15;

  useEffect(() => {
    // Handle device motion event
    const handleMotion = (event) => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastUpdate;

      if (timeDifference > 100) { // To limit checks to every 100ms
        const { accelerationIncludingGravity } = event;

        if (accelerationIncludingGravity) {
          const deltaX = accelerationIncludingGravity.x - x;
          const deltaY = accelerationIncludingGravity.y - y;
          const deltaZ = accelerationIncludingGravity.z - z;

          const totalAcceleration = Math.abs(deltaX + deltaY + deltaZ);

          if (totalAcceleration > SHAKES_THRESHOLD) {
            setShakeDetected(true);
            setAcceleration(totalAcceleration);
            // Optionally send data to the backend (if needed)
            fetch('/api/shake', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                shakeDetected: true,
                acceleration: totalAcceleration,
              }),
            });
          } else {
            setShakeDetected(false);
          }

          // Update previous acceleration data
          x = accelerationIncludingGravity.x;
          y = accelerationIncludingGravity.y;
          z = accelerationIncludingGravity.z;
          lastUpdate = currentTime;
        }
      }
    };

    // Add event listener for device motion
    window.addEventListener('devicemotion', handleMotion);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  return (
    <div>
      <h1>Shake Detection</h1>
      <p>{shakeDetected ? 'Shake detected!' : 'No shake detected.'}</p>
      {shakeDetected && (
        <p>Acceleration: {acceleration.toFixed(2)} (Threshold: {SHAKES_THRESHOLD})</p>
      )}
    </div>
  );
};

export default ShakeDetector;
