import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "xs";

interface TypographyProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string | number;
  type?: TypographyType;
}

const typographyStyles: Record<TypographyType, string> = {
  h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-medium tracking-tight",
  h6: "scroll-m-20 text-base font-medium tracking-tight",
  p: "leading-6 text-base",
  small: "text-sm leading-5",
  xs: "text-xs leading-4",
};

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ type = "p", className, text, ...props }, ref) => {
    const Tag = ["xs", "small"].includes(type)
      ? "p"
      : (type as Exclude<TypographyType, "xs" | "small">);

    return (
      <Tag
        ref={ref}
        className={cn(typographyStyles[type], className)}
        {...props}
      >
        {text}
      </Tag>
    );
  },
);

Typography.displayName = "Typography";
