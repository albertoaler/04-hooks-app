import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubtitle } from "./ui/MySubtitle";

// In this case, we wouldn't have to memorize because it is outside the component
// and it is a pure function, we don't expect any arguments
// const handleMyAPICall = () => {
//   console.log('Llamar a mi API');
// };

export const MemoHook = () => {

  const [title, setTitle] = useState('Hola');
  const [subtitle, setSubtitle] = useState('Mundo');

  // useCallback is to memorize a function. Before React Compiler,
  // when a component was re-render, React assigns a new memory space to each function, so
  // because it is a 'new' function, it will render all the child components that uses
  // that function.
  const handleMyAPICall = useCallback(() => {
    console.log('Llamar a mi API', subtitle);
  }, [subtitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      {/* Another way:  callMyAPI={() => useCallBack(handleMyAPICall(argument))} */}
      <MySubtitle subtitle={subtitle} callMyAPI={handleMyAPICall} />

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello, ' + new Date().getTime())}
      >
        Cambiar título
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubtitle('World, ' + new Date().getTime())}
      >
        Cambiar subtítulo
      </button>
    </div>
  );
};
