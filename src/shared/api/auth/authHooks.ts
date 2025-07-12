import { createMutationHook } from "@/shared/api";
import { LoginSchema } from "@/shared/validations/schemas/loginSchema";
import { RegistrationSchema } from "@/shared/validations/schemas/registrationSchema";

import { ErrorRegisterData, User } from "../types";
import { login, logout, register } from "./authService";

export const useRegister = createMutationHook<
  RegistrationSchema,
  RegistrationSchema,
  ErrorRegisterData
>(register);

export const useLogin = createMutationHook<LoginSchema, User>(login);

export const useLogout = createMutationHook(logout);
