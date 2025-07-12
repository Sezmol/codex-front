import { ComponentProps, ReactElement } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type DivPropsWithoutChildren = Omit<ComponentProps<"div">, "children">;

export interface FormElementProps<
  Schema extends FieldValues,
  Name extends FieldPath<Schema> = FieldPath<Schema>,
> extends DivPropsWithoutChildren {
  control: Control<Schema>;
  name: Name;
  children: (field: ControllerRenderProps<Schema, Name>) => ReactElement;
  label?: string;
  description?: string;
}

export const FormElement = <
  Schema extends FieldValues,
  Name extends FieldPath<Schema> = FieldPath<Schema>,
>({
  name,
  label,
  description,
  control,
  children,
  ...props
}: FormElementProps<Schema, Name>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{children(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
