import { z } from "zod";

import { registrationBase } from "./registrationSchema";

export const editProfileSchema = registrationBase.omit({
  confirmPassword: true,
  password: true,
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
