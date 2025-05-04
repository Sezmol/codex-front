import { ReactElement } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export interface FormElementProps<Schema extends FieldValues> {
  control: Control<Schema>;
  name: Path<Schema>;
  children: (field: ControllerRenderProps<Schema>) => ReactElement;
  label?: string;
  description?: string;
}

export const FormElement = <Schema extends FieldValues>({
  name,
  label,
  description,
  control,
  children,
}: FormElementProps<Schema>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{children(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
