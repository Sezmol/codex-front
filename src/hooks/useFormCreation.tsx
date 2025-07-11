import { ComponentProps, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldPath,
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema, ZodTypeAny } from "zod";

import { Form as FormComponent } from "@/ui/form";
import { FormElement, FormElementProps } from "@/ui/FormElement";

type UseFormPropsWithoutResolver<Fields extends FieldValues> = Omit<
  UseFormProps<Fields>,
  "resolver"
>;

interface FormCreation<Fields extends FieldValues>
  extends UseFormPropsWithoutResolver<Fields> {
  schema: ZodSchema<Fields>;
}

type FormItemProps<
  Fields extends FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
> = Omit<FormElementProps<Fields, Name>, "control">;

type FormProps = ComponentProps<"form">;

export const useFormCreation = <Fields extends FieldValues>({
  schema,
  ...restUseFormProps
}: FormCreation<Fields>): [
  UseFormReturn<Fields>,
  { Form: typeof Form; FormItem: typeof FormItem },
] => {
  const form = useForm<Fields>({
    ...restUseFormProps,
    resolver: zodResolver(schema as ZodTypeAny),
  });

  const FormItem = <Name extends FieldPath<Fields> = FieldPath<Fields>>(
    props: FormItemProps<Fields, Name>,
  ) => <FormElement {...props} control={form.control} />;

  const Form = useMemo(
    () =>
      ({ children, ...formProps }: FormProps) => (
        <FormComponent {...form}>
          <form {...formProps}>{children}</form>
        </FormComponent>
      ),
    [form],
  );

  return [
    form,
    {
      Form,
      FormItem,
    },
  ];
};
