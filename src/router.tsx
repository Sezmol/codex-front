import { createRouter } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

import { PendingComponent } from "./components/PendingComponent";
import { NotFound } from "./pages/NotFound";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    title?: string;
    Icon?: LucideIcon;
  }
}

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultPendingMs: 0,
  defaultPendingComponent: PendingComponent,
});
