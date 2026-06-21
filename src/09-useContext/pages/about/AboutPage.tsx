import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const AboutPage = () => {
  const { isAuthenticated, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Página sobre nosotros</h1>
      <hr />
      <div className="flex flex-col gap-2">

        {/* Perfil de Usuario si tiene sesión*/}
        {isAuthenticated &&
          <Link to="/profile" className="hover:text-blue-500 underline text-2xl">Perfil</Link>
        }

        {/* Login - Logout */}
        {isAuthenticated ? (
          <Button variant={'destructive'}
            onClick={logout}
          >
            Salir
          </Button>
        ) : (
          <Link to="/login" className="hover:text-blue-500 underline text-2xl">Iniciar Sesión</Link>
        )}

      </div>
    </div>
  );
};
