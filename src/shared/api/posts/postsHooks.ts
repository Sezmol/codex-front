import { createMutationHook, createQueryHook, queryClient } from "@/shared/api";
import { CreatePostSchema } from "@/shared/validations/schemas/createPostSchema";

import { POSTS_QUERY_KEY } from "../queryKeys";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  unlikePost,
  updatePost,
} from "./postsService";
import { GetPostsFilters, Post, UpdatePostVariables } from "./postsTypes";

const onSuccess = () =>
  queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });

export const useGetPosts = (filters?: GetPostsFilters) =>
  createQueryHook<Post[], Post[]>({
    queryFn: () => getPosts(filters),
    queryKey: [POSTS_QUERY_KEY, filters],
    defaultOptions: {
      select: (response) => response.data.data,
      staleTime: 1000 * 60 * 5,
    },
  })();

export const useLikePost = createMutationHook<string>(likePost, {
  onSuccess,
});

export const useUnlikePost = createMutationHook<string>(unlikePost, {
  onSuccess,
});

export const useDeletePost = createMutationHook<string>(deletePost);

export const useCreatePost = createMutationHook<CreatePostSchema>(createPost);

export const useUpdatePost =
  createMutationHook<UpdatePostVariables>(updatePost);
