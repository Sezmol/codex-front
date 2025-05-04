import { ComponentProps, ForwardedRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type OptionValue = string | number;

interface SelectOption {
  value: OptionValue;
  label: string;
}

export interface BaseSelectProps
  extends Omit<ComponentProps<"button">, "onChange"> {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  value?: OptionValue;
  onChange?(value: OptionValue): void;
}

function BaseSelectInner(
  {
    options,
    placeholder,
    className,
    onChange,
    value,
    ...props
  }: BaseSelectProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Select onValueChange={onChange} defaultValue={`${value}`}>
      <SelectTrigger ref={ref} className={cn("w-full", className)} {...props}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={`${value}`}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const BaseSelect = forwardRef(BaseSelectInner);
