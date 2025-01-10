'use client'

import { useEffect, useState, useRef } from 'react';

const ShakeDetector = () => {
  const [shakeDetected, setShakeDetected] = useState(false);
  const [acceleration, setAcceleration] = useState(0);
  const lastUpdate = useRef(0);
  const x = useRef(0);
  const y = useRef(0);
  const z = useRef(0);

  // Threshold for shake detection
  const SHAKES_THRESHOLD = 5;

  useEffect(() => {
    // Toggle shakeDetected every 5 seconds
    const interval = setInterval(() => {
      setShakeDetected((prev) => !prev);
      // Simulate acceleration value when shaking is active
      setAcceleration((prevShakeDetected) => (!prevShakeDetected ? 0 : Math.random() * 10 + SHAKES_THRESHOLD));
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Debug: Check if device motion is supported
    if (!window.DeviceMotionEvent) {
      console.warn('Device motion is not supported by this browser.');
      return;
    }

    const handleMotion = (event) => {
      // This part will no longer affect shakeDetected as it is overridden
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastUpdate.current;

      if (timeDifference > 100) { // Limit checks to every 100ms
        const { accelerationIncludingGravity } = event;

        if (accelerationIncludingGravity) {
          const deltaX = accelerationIncludingGravity.x - x.current;
          const deltaY = accelerationIncludingGravity.y - y.current;
          const deltaZ = accelerationIncludingGravity.z - z.current;

          const totalAcceleration = Math.abs(deltaX + deltaY + deltaZ);

          // Update acceleration data (no effect on shakeDetected here)
          x.current = accelerationIncludingGravity.x;
          y.current = accelerationIncludingGravity.y;
          z.current = accelerationIncludingGravity.z;
          lastUpdate.current = currentTime;
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
      {/* {shakeDetected && (
        <p>Acceleration: {acceleration.toFixed(2)} (Threshold: {SHAKES_THRESHOLD})</p>
      )} */}
    </div>
  );
};

export default ShakeDetector;
