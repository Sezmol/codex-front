import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { queryClient } from "@/shared/api";
import { useLogin } from "@/shared/api/auth/authHooks";
import { CURRENT_USER_QUERY_KEY } from "@/shared/api/queryKeys";
import { AuthContainer } from "@/widgets/AuthContainer";
import { ROUTES } from "@/shared/constants/routerPaths";
import { useFormCreation } from "@/shared/hooks/useFormCreation";
import { Route } from "@/app/routes/login";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { LoginSchema, loginSchema } from "@/shared/validations/schemas/loginSchema";

const DEFAULT_VALUES: LoginSchema = {
  nickname: "",
  password: "",
};

export const Login = () => {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [{ handleSubmit }, { Form, FormItem }] = useFormCreation({
    schema: loginSchema,
    defaultValues: DEFAULT_VALUES,
  });

  const { mutate: login, isPending } = useLogin({
    onError: ({ status }) => {
      const errorMessage =
        status === 401
          ? "Invalid credentials"
          : "Error while logging in, please try again later";

      toast.error(errorMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      navigate({ to: search.redirect ?? ROUTES.HOME, replace: true });
    },
  });

  const onSubmit = (values: LoginSchema) => login(values);

  return (
    <AuthContainer
      title="Login"
      description={
        !search.redirect
          ? "Enter your nickname and password below to login to your account"
          : ""
      }
      type="login"
    >
      {search.redirect && (
        <p className="text-red-500 text-sm mt-2 mb-6">
          You need to login to access this page
        </p>
      )}

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <FormItem name="nickname" label="Nickname">
          {(field) => <Input placeholder="Enter your nickname" {...field} />}
        </FormItem>

        <FormItem name="password" label="Password">
          {(field) => <Input type="password" {...field} />}
        </FormItem>

        <Button type="submit" className="mt-2" loading={isPending}>
          Submit
        </Button>
      </Form>
    </AuthContainer>
  );
};
