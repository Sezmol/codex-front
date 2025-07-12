import { Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Header } from "@/widgets/Header";
import { ROUTES_WITHOUT_AUTH } from "@/shared/constants/routerPaths";

export const AppLayout = () => {
  const location = useLocation();

  const routeWithoutAuth = ROUTES_WITHOUT_AUTH.includes(
    location.pathname as (typeof ROUTES_WITHOUT_AUTH)[number],
  );

  return (
    <>
      {routeWithoutAuth ? (
        <Outlet />
      ) : (
        <div className="flex flex-col">
          <Header />

          <main className="px-6 py-4 max-w-[1280px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      )}
      <TanStackRouterDevtools />
    </>
  );
};
