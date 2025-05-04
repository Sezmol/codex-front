import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/routerPaths";
import { useUserContext } from "@/contexts/UserContext";

export const PrivateLayout = () => {
  const { isAuth, isLoading, isSuccess } = useUserContext();

  if (!isAuth && !isLoading && !isSuccess) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
