import { z } from "zod";

export const loginSchema = z.object({
  nickname: z.string().nonempty("Nickname is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
