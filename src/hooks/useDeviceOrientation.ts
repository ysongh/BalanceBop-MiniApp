import { useEffect, useState } from 'react';

interface OrientationData {
  beta: number;
  gamma: number;
}

export const useDeviceOrientation = (): OrientationData => {
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;
      console.log('Orientation event:', { beta, gamma, event }); // Debug log
      setOrientation({ beta, gamma });
    };

    const requestPermission = async () => {
      // @ts-ignore
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          // @ts-ignore
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            console.warn('Device orientation permission denied');
            setOrientation({ beta: 0, gamma: 0 });
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
          setOrientation({ beta: 0, gamma: 0 });
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
