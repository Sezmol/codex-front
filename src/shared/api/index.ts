import {
  MutationFunction,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  BaseResponse,
  CreateQueryHookArgs,
  MutationOptions,
  QueryOptions,
} from "./types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;

        if (status && [401, 401].includes(status)) {
          return false;
        }

        return failureCount < 2;
      },
    },
  },
});

export const createMutationHook = <
  Variables = void,
  ResData = unknown,
  ErrorData = unknown,
>(
  mutationFn: MutationFunction<BaseResponse<ResData>, Variables>,
  defaultOptions?: MutationOptions<Variables, ResData, ErrorData>,
) => {
  return (options?: MutationOptions<Variables, ResData, ErrorData>) =>
    useMutation({ mutationFn, ...defaultOptions, ...options });
};

export const createQueryHook = <
  QueryFnData,
  TData = BaseResponse<QueryFnData>,
  ErrorData = unknown,
>({
  queryFn,
  queryKey,
  defaultOptions,
}: CreateQueryHookArgs<QueryFnData, TData, ErrorData>) => {
  return (options?: QueryOptions<QueryFnData, TData, ErrorData>) =>
    useQuery<BaseResponse<QueryFnData>, AxiosError<ErrorData>, TData>({
      queryFn,
      queryKey,
      ...defaultOptions,
      ...options,
    });
};
