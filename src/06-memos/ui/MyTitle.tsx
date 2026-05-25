interface Props {
  title: string;
}

// We can use the React Dev Tools on the browser and confirm
// That React Compiler is auto-memoizing our component, so 
// is not necessary use React.memo() or memo()
// export const MyTitle = React.memo(({ title }: Props) => {
//   console.log('My title re-render');

//   return (
//     <h1 className="text-3xl">{title}</h1>
//   );
// });

export const MyTitle = ({ title }: Props) => {
  console.log('My title re-render');

  return (
    <h1 className="text-3xl">{title}</h1>
  );
};