import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ObjectEntries } from "@/shared/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const typedEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as ObjectEntries<T>;
};
