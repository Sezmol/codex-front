import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";

import { Profile } from "@/pages/Profile";

export const Route = createFileRoute("/profile/$userId")({
  component: Profile,
  staticData: {
    title: "Profile",
    Icon: User,
  },
});
