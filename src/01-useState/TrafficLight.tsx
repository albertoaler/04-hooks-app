import { useState } from "react";

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


export const TrafficLight = () => {

  const [light, setLight] = useState<TrafficLightColor>('red');

  const onClickHandler = (value: TrafficLightColor) => {
    setLight(value);
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        {/* ternary operator for color change */}
        <div className={`w-32 h-32 ${light === 'red' ? colors.red : colors.gray} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'yellow' ? colors.yellow : colors.gray} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'green' ? colors.green : colors.gray} rounded-full`}></div>

        {/* Botón para cambiar el estado de la luz */}
        <div className="flex gap-2">
          <button
            onClick={() => onClickHandler('red')}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Rojo
          </button>
          <button
            onClick={() => onClickHandler('yellow')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Amarillo
          </button>
          <button
            onClick={() => onClickHandler('green')}
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Verde
          </button>
        </div>
      </div>
    </div >
  );
};
