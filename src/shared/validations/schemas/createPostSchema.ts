import { z } from "zod";

import { PostType } from "@/shared/api/posts/postsTypes";
import { Role } from "@/shared/types/enums";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(20000, "Content is too long"),
  direction: z.nativeEnum(Role, { message: "Please, select a direction" }),
  type: z.nativeEnum(PostType, { message: "Please, select a type" }),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
