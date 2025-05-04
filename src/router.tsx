import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "./constants/routerPaths";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
    ],
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
]);
