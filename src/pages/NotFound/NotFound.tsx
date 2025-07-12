import { Link } from "@tanstack/react-router";

import { ROUTES } from "@/shared/constants/routerPaths";

export const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
      <h3 className="text-2xl font-semibold">Page not found</h3>
      <Link to={ROUTES.HOME}>Go to home</Link>
    </div>
  );
};
