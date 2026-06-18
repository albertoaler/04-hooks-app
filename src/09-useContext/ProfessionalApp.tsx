import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { UserContextProvider } from "./context/UserContext";

export const ProfessionalApp = () => {
  return (
    // To let the UserContextProvider component have children, we
    // need to specify it on the props of the component
    <UserContextProvider>
      <div className="bg-gradient">
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
};
