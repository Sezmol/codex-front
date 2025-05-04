import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLogout } from "@/api/auth/authHooks";
import { ROUTES } from "@/constants/routerPaths";
import { useUserContext } from "@/contexts/UserContext";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { ThemeToggler } from "./ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { setIsAuth } = useUserContext();

  const handleLogout = async () => {
    setIsAuth(false);
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="flex justify-end items-center gap-3 px-6 py-4">
      <ThemeToggler />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            <User width={24} height={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
