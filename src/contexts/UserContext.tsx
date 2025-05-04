import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { useGetCurrentUser } from "@/api/auth/authHooks";
import { User } from "@/api/types";
import { ROUTES_WITHOUT_AUTH } from "@/constants/routerPaths";

interface ContextType
  extends Omit<UseQueryResult<AxiosResponse<User>>, "data"> {
  user?: User;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<ContextType | null>(null);

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false);
  const { data, ...restUserData } = useGetCurrentUser({
    enabled: !ROUTES_WITHOUT_AUTH.includes(window.location.pathname),
  });

  useLayoutEffect(() => {
    if (restUserData.isSuccess) {
      setIsAuth(true);
    }
  }, [restUserData.isSuccess]);

  return (
    <UserContext.Provider
      value={{ user: data?.data, isAuth, setIsAuth, ...restUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};

export { UserContextProvider, useUserContext };
