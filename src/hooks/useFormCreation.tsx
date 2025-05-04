import { ComponentProps, PropsWithChildren, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";

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

type FormItemProps<Fields extends FieldValues> = Omit<
  FormElementProps<Fields>,
  "control"
>;

type FormProps = ComponentProps<"form"> & PropsWithChildren;

export const useFormCreation = <Fields extends FieldValues>({
  schema,
  ...restUseFormProps
}: FormCreation<Fields>): [
  UseFormReturn<Fields>,
  { Form: typeof Form; FormItem: typeof FormItem },
] => {
  const form = useForm({
    ...restUseFormProps,
    resolver: zodResolver(schema),
  });

  const FormItem = useCallback(
    (props: FormItemProps<Fields>) => {
      return <FormElement {...props} control={form.control} />;
    },
    [form.control],
  );

  const Form = useCallback(
    ({ children, ...formProps }: FormProps) => {
      return (
        <FormComponent {...form}>
          <form {...formProps}>{children}</form>
        </FormComponent>
      );
    },
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
