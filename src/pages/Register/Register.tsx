import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { queryClient } from "@/api";
import { useRegister } from "@/api/auth/authHooks";
import { CURRENT_USER_QUERY_KEY } from "@/api/queryKeys";
import { AuthContainer } from "@/components/AuthContainer";
import { ROLES_OPTIONS } from "@/constants";
import { ROUTES } from "@/constants/routerPaths";
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

const fields: {
  name: keyof RegistrationSchema;
  label: string;
  type?: string;
  placeholder?: string;
}[] = [
  { name: "firstName", label: "First Name", placeholder: "John" },
  { name: "lastName", label: "Last Name", placeholder: "Doe" },
  { name: "nickname", label: "Nickname", placeholder: "johnDoe123" },
  { name: "email", label: "Email", placeholder: "email@example.com" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

export const Register = () => {
  const navigate = useNavigate();

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
      navigate({ to: ROUTES.HOME, replace: true });
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
        {fields.map(({ name, label, placeholder, type }) => (
          <FormItem key={name} name={name} label={label}>
            {(field) => (
              <Input {...field} placeholder={placeholder} type={type} />
            )}
          </FormItem>
        ))}

        <FormItem name="role" label="Role">
          {(field) => <BaseSelect options={ROLES_OPTIONS} {...field} />}
        </FormItem>

        <Button type="submit" className="mt-2" loading={isPending}>
          Submit
        </Button>
      </Form>
    </AuthContainer>
  );
};
