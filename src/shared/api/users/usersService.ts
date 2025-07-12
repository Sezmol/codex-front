import { CreatePortfolioItemSchema } from "@/shared/validations/schemas/createPortfolioItemSchema";
import { EditProfileSchema } from "@/shared/validations/schemas/editProfileSchema";

import { apiClient } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { UpdatePortfolioItemVariables } from "./usersType";

export const getUser = (id: string) => {
  return apiClient.get(`${ENDPOINTS.USERS}/${id}`);
};

export const createPortfolioItem = (data: CreatePortfolioItemSchema) => {
  return apiClient.post(`${ENDPOINTS.USERS}/portfolio`, data);
};

export const deletePortfolioItem = (id: string) => {
  return apiClient.delete(`${ENDPOINTS.USERS}/portfolio/${id}`);
};

export const updatePortfolioItem = ({
  id,
  data,
}: UpdatePortfolioItemVariables) => {
  return apiClient.put(`${ENDPOINTS.USERS}/portfolio/${id}`, data);
};

export const updateUser = (data: EditProfileSchema) => {
  return apiClient.put(`${ENDPOINTS.USERS}`, data);
};

export const uploadAvatar = (data: FormData) => {
  return apiClient.post(`${ENDPOINTS.USERS}/avatar`, data);
};
