import { createRootRoute, redirect } from "@tanstack/react-router";
import { AxiosError } from "axios";

import { queryClient } from "@/shared/api";
import { getCurrentUser } from "@/shared/api/auth/authService";
import { CURRENT_USER_QUERY_KEY } from "@/shared/api/queryKeys";
import { BaseResponse, User } from "@/shared/api/types";
import { ErrorComponent } from "@/widgets/ErrorComponent";
import { ROUTES, ROUTES_WITHOUT_AUTH } from "@/shared/constants/routerPaths";
import { AppLayout } from "@/widgets/layouts/AppLayout";

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
