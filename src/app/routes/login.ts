import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Login } from "@/pages/Login";

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
});
