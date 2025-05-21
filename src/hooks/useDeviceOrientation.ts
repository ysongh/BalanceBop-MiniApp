import { useEffect, useState } from 'react';

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });

  useEffect(() => {
    const handleOrientation = (event) => {
      setOrientation({ beta: event.beta, gamma: event.gamma }); // beta: front-to-back tilt, gamma: left-to-right tilt
    };

    // Request permission for iOS
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestPermission();

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return orientation;
};
