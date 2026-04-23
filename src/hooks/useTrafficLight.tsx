import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  gray: "bg-gray-500",
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {

  const [light, setLight] = useState<TrafficLightColor>('red');
  const [countdown, setCountdown] = useState(5);

  // Use effect receives two arguments, the callback and an array dependencies
  useEffect(() => {
    if (countdown === 0) return;

    const intervalID = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [countdown]);

  if (countdown === 0) {
    setCountdown(5);

    switch (light) {
      case 'red':
        setLight('green');
        break;
      case 'yellow':
        setLight('red');
        break;
      case 'green':
        setLight('yellow');
        break;
    }
  }

  return {
    // Properties
    countdown,

    // Computed
    percentage: countdown / 5 * 100,
    redLight: light === 'red' ? colors.red : colors.gray,
    yellowLight: light === 'yellow' ? colors.yellow : colors.gray,
    greenLight: light === 'green' ? colors.green : colors.gray,
  };
};
