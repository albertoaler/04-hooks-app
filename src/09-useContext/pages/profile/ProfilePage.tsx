import { use } from "react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/09-useContext/context/UserContext";
import { useNavigate } from "react-router";

export const ProfilePage = () => {

  const navigation = useNavigate();

  const { user, logout } = use(UserContext);

  const handleOnClick = () => {
    logout();
    navigation('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <hr />
      <pre className="whitespace-pre-wrap wrap-break-words my-4">
        {JSON.stringify(user, null, 2)}
      </pre>
      <Button variant="destructive"
        onClick={handleOnClick}
      >
        Salir
      </Button>
    </div>
  );
};
