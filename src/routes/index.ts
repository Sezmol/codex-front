import { createFileRoute } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

import { postsSearchSchema } from "@/validations/schemas/postsFiltersSchema";

import { Home } from "../pages/Home";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: postsSearchSchema,
  staticData: {
    Icon: HomeIcon,
    title: "Home",
  },
});
