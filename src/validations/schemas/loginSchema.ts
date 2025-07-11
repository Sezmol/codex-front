import { z } from "zod";

export const loginSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
