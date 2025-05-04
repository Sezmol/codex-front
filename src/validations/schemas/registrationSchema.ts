import { z } from "zod";

import { Role } from "@/types/enums";

export const registrationSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    nickname: z.string().nonempty("Nickname is required"),
    email: z.string().nonempty("Email is required").email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
    role: z.nativeEnum(Role, { message: "Please, select a role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;
