import {
  MutationFunction,
  QueryClient,
  QueryFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { MutationOptions, QueryOptions } from "./types";

export const queryClient = new QueryClient();

export const createMutationHook = <
  Variables = void,
  ResData = unknown,
  ErrorData = unknown,
>(
  mutationFn: MutationFunction<AxiosResponse<ResData>, Variables>,
  defaultOptions?: MutationOptions<Variables, ResData, ErrorData>,
) => {
  return (options?: MutationOptions<Variables, ResData, ErrorData>) =>
    useMutation({ mutationFn, ...defaultOptions, ...options });
};

export const createQueryHook = <ResData = unknown, ErrorData = unknown>(
  queryFn: QueryFunction<AxiosResponse<ResData>>,
  queryKey: string[],
  defaultOptions?: QueryOptions<ResData, ErrorData>,
) => {
  return (options?: QueryOptions<ResData, ErrorData>) =>
    useQuery({ queryFn, queryKey, ...defaultOptions, ...options });
};
