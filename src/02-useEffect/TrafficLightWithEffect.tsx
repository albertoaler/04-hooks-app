import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  gray: "bg-gray-500",
};

// This is hardcoded, we need to update as soon we change colors object
// type TrafficLightColor = 'red'|'yellow'|'green'|'gray';

// This will update as soon colors object changes
type TrafficLightColor = keyof typeof colors;


export const TrafficLightWithEffect = () => {

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

  // There is no need to use an effect here
  // useEffect(() => {
  //   if (countdown > 0) return;

  //   setCountdown(5);

  //   switch (light) {
  //     case 'red':
  //       setLight('green');
  //       break;
  //     case 'yellow':
  //       setLight('red');
  //       break;
  //     case 'green':
  //       setLight('yellow');
  //       break;
  //   }

  // }, [countdown, light]);

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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-extrabold">Semáforo con useEffect</h1>
        <h1 className="text-white text-xl">Restate: {countdown}</h1>
        <div className="w-64 h-2 bg-gray-400 rounded-full">
          <div className="w-64 h-2 bg-blue-500 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${countdown / 5 * 100}%` }}
          >
          </div>
        </div>

        {/* ternary operator for color change */}
        <div className={`w-32 h-32 ${light === 'red' ? colors.red : colors.gray} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'yellow' ? colors.yellow : colors.gray} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'green' ? colors.green : colors.gray} rounded-full`}></div>
      </div>
    </div >
  );
};
