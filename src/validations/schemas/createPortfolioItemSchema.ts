import { z } from "zod";

import { PortfolioLinkType } from "@/api/types";

import { externalUrlPattern } from "../regex";

export const createPortfolioItemSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().optional(),
  previewImage: z.string().optional(),
  links: z
    .array(
      z.object({
        type: z.nativeEnum(PortfolioLinkType, {
          message: "Please, select a type",
        }),
        url: z.string().regex(externalUrlPattern, "Invalid URL"),
        label: z.string().min(1, "Label is required"),
      }),
    )
    .max(3, "Maximum 3 links allowed"),
});

export type CreatePortfolioItemSchema = z.infer<
  typeof createPortfolioItemSchema
>;
