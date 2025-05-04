import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { queryClient } from "@/api";
import { useLogin } from "@/api/auth/authHooks";
import { CURRENT_USER_QUERY_KEY } from "@/api/queryKeys";
import { AuthContainer } from "@/components/AuthContainer";
import { ROUTES } from "@/constants/routerPaths";
import { useUserContext } from "@/contexts/UserContext";
import { useFormCreation } from "@/hooks/useFormCreation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { LoginSchema, loginSchema } from "@/validations/schemas/loginSchema";

const DEFAULT_VALUES: LoginSchema = {
  nickname: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();

  const { setIsAuth } = useUserContext();

  // поменять zod
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
      setIsAuth(true);
      navigate(ROUTES.HOME, { replace: true });
    },
  });

  const onSubmit = (values: LoginSchema) => login(values);

  return (
    <AuthContainer
      title="Login"
      description="Enter your nickname and password below to login to your account"
      type="login"
    >
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

        <Button type="submit" className="mt-2" disabled={isPending}>
          Submit
        </Button>
      </Form>
    </AuthContainer>
  );
};
