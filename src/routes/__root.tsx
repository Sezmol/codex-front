import { createRootRoute, redirect } from "@tanstack/react-router";
import { AxiosError } from "axios";

import { queryClient } from "@/api";
import { getCurrentUser } from "@/api/auth/authService";
import { CURRENT_USER_QUERY_KEY } from "@/api/queryKeys";
import { BaseResponse, User } from "@/api/types";
import { ErrorComponent } from "@/components/ErrorComponent";
import { ROUTES, ROUTES_WITHOUT_AUTH } from "@/constants/routerPaths";
import { AppLayout } from "@/layouts/AppLayout";

export const Route = createRootRoute({
  component: AppLayout,
  loader: async ({ location }) => {
    const withoutAuthRoute = ROUTES_WITHOUT_AUTH.includes(
      location.pathname as (typeof ROUTES_WITHOUT_AUTH)[number],
    );

    if (withoutAuthRoute) {
      return null;
    }

    try {
      const cachedUserData: BaseResponse<User> | undefined =
        queryClient.getQueryData([CURRENT_USER_QUERY_KEY]);

      if (cachedUserData) {
        return cachedUserData.data.data;
      }

      const user = await queryClient.fetchQuery<BaseResponse<User>>({
        queryKey: [CURRENT_USER_QUERY_KEY],
        queryFn: getCurrentUser,
      });

      return user.data.data;
    } catch (error) {
      const e = error as AxiosError;

      console.log(e);

      if (e.status === 401) {
        throw redirect({
          to: ROUTES.LOGIN,
          search: { redirect: location.pathname },
        });
      }

      throw error;
    }
  },

  errorComponent: (props) => <ErrorComponent {...props} />,
});
