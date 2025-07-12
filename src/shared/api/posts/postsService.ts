import qs from "qs";

import { CreatePostSchema } from "@/shared/validations/schemas/createPostSchema";

import { apiClient } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { GetPostsFilters, UpdatePostVariables } from "./postsTypes";

export const getPosts = async (filters?: GetPostsFilters) => {
  return await apiClient.get(ENDPOINTS.POSTS, {
    params: filters,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const likePost = async (postId: string) => {
  return await apiClient.post(`${ENDPOINTS.POSTS}/${postId}/like`);
};

export const unlikePost = async (postId: string) => {
  return await apiClient.delete(`${ENDPOINTS.POSTS}/${postId}/like`);
};

export const deletePost = async (postId: string) => {
  return await apiClient.delete(`${ENDPOINTS.POSTS}/${postId}`);
};

export const createPost = async (post: CreatePostSchema) => {
  return await apiClient.post(ENDPOINTS.POSTS, post);
};

export const updatePost = async ({ postId, post }: UpdatePostVariables) => {
  return await apiClient.put(`${ENDPOINTS.POSTS}/${postId}`, post);
};
