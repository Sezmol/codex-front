import { createMutationHook, createQueryHook } from "@/api";
import { LoginSchema } from "@/validations/schemas/loginSchema";
import { RegistrationSchema } from "@/validations/schemas/registrationSchema";

import { CURRENT_USER_QUERY_KEY } from "../queryKeys";
import { ErrorRegisterData, User } from "../types";
import { getCurrentUser, login, logout, register } from "./authService";

export const useRegister = createMutationHook<
  RegistrationSchema,
  RegistrationSchema,
  ErrorRegisterData
>(register);

export const useLogin = createMutationHook<LoginSchema, User>(login);

export const useGetCurrentUser = createQueryHook<User>(
  getCurrentUser,
  [CURRENT_USER_QUERY_KEY],
  { retry: false, refetchOnWindowFocus: false },
);

export const useLogout = createMutationHook(logout);
