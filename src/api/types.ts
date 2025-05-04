import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { Role } from "@/types/enums";
import { RegistrationSchema } from "@/validations/schemas/registrationSchema";

export type MutationOptions<
  Variables = void,
  ResData = unknown,
  ErrorData = unknown,
> = Omit<
  UseMutationOptions<AxiosResponse<ResData>, AxiosError<ErrorData>, Variables>,
  "mutationFn"
>;

export type QueryOptions<ResData = unknown, ErrorData = unknown> = Omit<
  UseQueryOptions<AxiosResponse<ResData>, AxiosError<ErrorData>>,
  "queryFn" | "queryKey"
>;

export interface User {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  role: Role;
}

export interface ErrorRegisterData {
  field: keyof Pick<RegistrationSchema, "email" | "nickname">;
  message: string;
}
