import { LoginSchema } from "@/validations/schemas/loginSchema";
import { RegistrationSchema } from "@/validations/schemas/registrationSchema";

import { apiClient } from "../axios";
import { ENDPOINTS } from "../endpoints";

export const register = async (data: RegistrationSchema) => {
  return await apiClient.post(ENDPOINTS.REGISTER, data);
};

export const login = async (data: LoginSchema) => {
  return await apiClient.post(ENDPOINTS.LOGIN, data);
};

export const logout = async () => {
  return await apiClient.post(ENDPOINTS.LOGOUT);
};

export const getCurrentUser = async () => {
  return await apiClient.get(ENDPOINTS.AUTH);
};
