import { use, type Usable } from "react";
import { type User } from "./api/get-user.action";

interface Props {
  getUser: Usable<User>;
}

// Wouldn't be easy to make the component async? Spoiler: we can. Using nextjs
// but in this case we will use 'use' api and 'suspense' to 'wait' the
// initial load
// export const ClientInformation = ({ id }: { id: number; }) => {
export const ClientInformation = ({ getUser }: Props) => {

  // This handles the making an async component (that would be a nextjs' server component)
  const user = use(getUser);

  // To render this information we would need a pieces of state
  // useEffect(() => {
  //   getUserAction(id)
  //     .then(console.log);
  // }, [id]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - {user.id}
      </h2>
      <p className="text-white text-2xl">
        {user.location}
      </p>
      <p className="text-white text-2xl">
        {user.role}
      </p>
    </div>
  );
};
