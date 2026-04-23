import { useTrafficLight } from "../hooks/useTrafficLight";

export const TrafficLightWithHook = () => {

  const { countdown, percentage, redLight, yellowLight, greenLight } = useTrafficLight();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-extrabold">Semáforo con useEffect</h1>
        <h1 className="text-white text-xl">Restate: {countdown}</h1>
        <div className="w-64 h-2 bg-gray-400 rounded-full">
          <div className="w-64 h-2 bg-blue-500 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${percentage}%` }}
          >
          </div>
        </div>

        {/* ternary operator for color change */}
        <div className={`w-32 h-32 ${redLight} rounded-full`}></div>
        <div className={`w-32 h-32 ${yellowLight} rounded-full`}></div>
        <div className={`w-32 h-32 ${greenLight} rounded-full`}></div>
      </div>
    </div >
  );
};
