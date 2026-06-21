import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from "../pages/about/AboutPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<ProfilePage />} />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]);


