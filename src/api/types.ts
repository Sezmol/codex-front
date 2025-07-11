import {
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { Role } from "@/types/enums";
import { RegistrationSchema } from "@/validations/schemas/registrationSchema";

export type BaseResponse<T = unknown> = AxiosResponse<{
  data: T;
  message: string;
}>;

export interface CustomSelect<D, R> {
  select: (response: BaseResponse<D>) => R;
}

export type MutationOptions<
  Variables = void,
  ResData = unknown,
  ErrorData = unknown,
> = Omit<
  UseMutationOptions<BaseResponse<ResData>, AxiosError<ErrorData>, Variables>,
  "mutationFn"
>;

export type QueryOptions<
  QueryFnData = unknown,
  TData = BaseResponse<QueryFnData>,
  ErrorData = unknown,
> = Omit<
  UseQueryOptions<BaseResponse<QueryFnData>, AxiosError<ErrorData>, TData>,
  "queryKey" | "queryFn"
> &
  CustomSelect<QueryFnData, TData>;

export interface CreateQueryHookArgs<
  QueryFnData,
  TData = BaseResponse<QueryFnData>,
  ErrorData = unknown,
> {
  queryFn: QueryFunction<BaseResponse<QueryFnData>>;
  queryKey: QueryKey;
  defaultOptions?: QueryOptions<QueryFnData, TData, ErrorData>;
}

export enum PortfolioLinkType {
  CODE = "code",
  PREVIEW = "preview",
  OTHER = "other",
}

export interface PortfolioLink {
  type: PortfolioLinkType;
  url: string;
  label: string;
}

export interface Portfolio {
  _id: string;
  title: string;
  description?: string;
  links: PortfolioLink[];
  previewImage?: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  role: Role;
  description?: string;
  workplace?: string;
  avatar?: string;
  portfolio?: Portfolio[];
}

export interface ErrorRegisterData {
  field: keyof Pick<RegistrationSchema, "email" | "nickname">;
  message: string;
}

export type QueryResult<T = unknown, E = unknown> = UseQueryResult<
  AxiosResponse<T>,
  AxiosError<E>
>;
