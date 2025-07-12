import { z } from "zod";

import { Role } from "@/shared/types/enums";

export const registrationBase = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  nickname: z.string().min(1, "Nickname is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
  role: z.nativeEnum(Role, { message: "Please, select a role" }),
  workplace: z.string().optional(),
  description: z.string().optional(),
});

export const registrationSchema = registrationBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export type RegistrationSchema = z.infer<typeof registrationSchema>;
