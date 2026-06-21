import { use, type JSX } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
  element: JSX.Element;
}

export const PublicRoute = ({ element }: Props) => {
  const { authStatus } = use(UserContext);

  if (authStatus === 'checking') {
    return <div>Loading...</div>;
  }

  // If authenticated, redirect away from public auth pages (like /login) to a private page (like /profile)
  if (authStatus === 'authenticated') {
    return <Navigate to="/profile" replace />;
  }

  // If not authenticated, allow viewing the login page
  return element;
};
