import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/constants/routerPaths";

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  description: string;
  type: "login" | "register";
}

export const AuthContainer = ({
  title,
  description,
  children,
  type,
}: AuthContainerProps) => {
  const isLogin = type === "login";

  return (
    <div className="bg-accent flex flex-col items-center justify-center h-screen">
      <h4 className="text-2xl font-medium mb-4">CodeX</h4>

      <div className="flex flex-col items-center justify-center shadow rounded-xl border bg-card p-6 w-full max-w-lg">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h4>

        <p className="text-sm text-muted-foreground mt-2 mb-6">{description}</p>

        {children}

        <p className="text-sm mt-2">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <Link to={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}>
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};
