import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { queryClient } from "@/api";
import { useRegister } from "@/api/auth/authHooks";
import { CURRENT_USER_QUERY_KEY } from "@/api/queryKeys";
import { AuthContainer } from "@/components/AuthContainer";
import { ROLES_OPTIONS } from "@/constants";
import { ROUTES } from "@/constants/routerPaths";
import { useUserContext } from "@/contexts/UserContext";
import { useFormCreation } from "@/hooks/useFormCreation";
import { Role } from "@/types/enums";
import { BaseSelect } from "@/ui/BaseSelect";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  RegistrationSchema,
  registrationSchema,
} from "@/validations/schemas/registrationSchema";

const DEFAULT_VALUES: RegistrationSchema = {
  firstName: "",
  lastName: "",
  email: "",
  nickname: "",
  password: "",
  confirmPassword: "",
  role: Role.FRONT_DEV,
};

export const Register = () => {
  const navigate = useNavigate();

  const { setIsAuth } = useUserContext();

  const [{ setError, handleSubmit }, { Form, FormItem }] = useFormCreation({
    schema: registrationSchema,
    defaultValues: DEFAULT_VALUES,
  });

  const { mutate: register, isPending } = useRegister({
    onError: ({ status, response }) => {
      const data = response?.data;

      if (status === 409 && data) {
        setError(data.field, { message: data.message });
        return;
      }

      toast.error("Error while registering, please try again later");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      navigate(ROUTES.HOME, { replace: true });
      setIsAuth(true);
    },
  });

  const onSubmit = (values: RegistrationSchema) => register(values);

  return (
    <AuthContainer
      title="Registration"
      description="Enter your information to create an account."
      type="register"
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <FormItem name="firstName" label="First Name">
          {(field) => <Input placeholder="John" {...field} />}
        </FormItem>

        <FormItem name="lastName" label="Last Name">
          {(field) => <Input placeholder="Doe" {...field} />}
        </FormItem>

        <FormItem name="nickname" label="Nickname">
          {(field) => <Input placeholder="johnDoe123" {...field} />}
        </FormItem>

        <FormItem name="email" label="Email">
          {(field) => <Input placeholder="email@example.com" {...field} />}
        </FormItem>

        <FormItem name="password" label="Password">
          {(field) => <Input type="password" {...field} />}
        </FormItem>

        <FormItem name="confirmPassword" label="Confirm Password">
          {(field) => <Input type="password" {...field} />}
        </FormItem>

        <FormItem name="role" label="Role">
          {(field) => <BaseSelect options={ROLES_OPTIONS} {...field} />}
        </FormItem>

        <Button type="submit" className="mt-2" disabled={isPending}>
          Submit
        </Button>
      </Form>
    </AuthContainer>
  );
};
