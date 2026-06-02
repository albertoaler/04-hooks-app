interface Props {
  subtitle: string;
  // Another way: (myValue: string) => void
  callMyAPI: () => void;
}

export const MySubtitle = ({ subtitle, callMyAPI }: Props) => {
  console.log('My Subtitle re-render');

  return (
    <>
      <h6 className="text-2xl font-bold">{subtitle}</h6>

      <button className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        // Another way: onClick={() => callMyAPI(subtitle)} 
        onClick={callMyAPI}
      >
        Llamar a función
      </button>
    </>
  );
};
