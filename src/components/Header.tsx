import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Link,
  useLoaderData,
  useMatches,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Loader2, LogOut, User } from "lucide-react";

import { useLogout } from "@/api/auth/authHooks";
import { CURRENT_USER_QUERY_KEY } from "@/api/queryKeys";
import { ROUTES } from "@/constants/routerPaths";
import { Route } from "@/routes/__root";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Typography } from "@/ui/Typography";

import { Logo } from "./Logo";
import { ThemeToggler } from "./ThemeToggler";

export const Header = () => {
  const user = useLoaderData({ from: "__root__" });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const navigate = useNavigate();
  const matches = useMatches();
  const { staticData } = matches[matches.length - 1];

  const { Icon, title } = staticData;

  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useLogout({
    onSuccess: () => {
      navigate({ to: ROUTES.LOGIN, replace: true });

      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      router.clearCache();
      router.invalidate({
        filter: (match) => match.routeId === Route.id,
      });
      closeDropdown();
    },
  });

  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => logout();

  return (
    <header className="flex justify-between items-center gap-3 px-6 py-4 border-b max-w-[1280px] w-full mx-auto sticky top-0 z-10 backdrop-blur-md">
      <Link to={ROUTES.HOME} className="text-primary">
        <Logo />
      </Link>

      <div className="flex items-center gap-2">
        {Icon && <Icon />}
        {title && <Typography text={title} type="h4" />}
      </div>

      <div className="flex gap-3">
        <ThemeToggler />

        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="rounded-full">
              <User width={24} height={24} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuLabel>
              <Typography
                text={`${user?.firstName} ${user?.lastName}`}
                type="h6"
              />
              {user?.email && (
                <Typography
                  text={user?.email}
                  type="xs"
                  className="text-muted-foreground font-normal"
                />
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {user?._id && (
              <DropdownMenuItem
                onClick={() => {
                  navigate({
                    to: ROUTES.PROFILE,
                    params: { userId: user._id },
                  });
                  closeDropdown();
                }}
              >
                <User /> Profile
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
              onClick={handleLogout}
              disabled={isPending}
            >
              <LogOut className="text-red-600 dark:text-red-400" /> Logout{" "}
              {isPending && <Loader2 className="animate-spin" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
