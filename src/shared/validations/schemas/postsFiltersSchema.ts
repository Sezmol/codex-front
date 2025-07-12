import { z } from "zod";

import { PostType } from "@/shared/api/posts/postsTypes";
import { Role } from "@/shared/types/enums";

export const postsSearchSchema = z.object({
  type: z.array(z.nativeEnum(PostType)).optional(),
  direction: z.array(z.nativeEnum(Role)).optional(),
});

export type PostsSearchSchema = z.infer<typeof postsSearchSchema>;
