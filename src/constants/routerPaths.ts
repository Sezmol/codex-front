import { FileRouteTypes } from "@/routeTree.gen";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile/$userId",
} as const satisfies Record<string, FileRouteTypes["fullPaths"]>;

export const ROUTES_WITHOUT_AUTH = [ROUTES.LOGIN, ROUTES.REGISTER];
