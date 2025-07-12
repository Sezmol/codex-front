import { createMutationHook, createQueryHook } from "@/shared/api";
import { CreatePortfolioItemSchema } from "@/shared/validations/schemas/createPortfolioItemSchema";
import { EditProfileSchema } from "@/shared/validations/schemas/editProfileSchema";

import { ErrorRegisterData, User } from "../types";
import {
  createPortfolioItem,
  deletePortfolioItem,
  getUser,
  updatePortfolioItem,
  updateUser,
  uploadAvatar,
} from "./usersService";
import { UpdatePortfolioItemVariables } from "./usersType";

export const useGetUser = (id: string) =>
  createQueryHook<User, User>({
    queryFn: () => getUser(id),
    queryKey: [id],
    defaultOptions: {
      select: (response) => response.data.data,
    },
  })();

export const useCreatePortfolioItem =
  createMutationHook<CreatePortfolioItemSchema>(createPortfolioItem);

export const useDeletePortfolioItem = createMutationHook(deletePortfolioItem);

export const useUpdatePortfolioItem =
  createMutationHook<UpdatePortfolioItemVariables>(updatePortfolioItem);

export const useUpdateUser = createMutationHook<
  EditProfileSchema,
  EditProfileSchema,
  ErrorRegisterData
>(updateUser);

export const useUploadAvatar = createMutationHook(uploadAvatar);
