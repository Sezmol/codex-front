import { Role } from "@/types/enums";
import { CreatePostSchema } from "@/validations/schemas/createPostSchema";

import { User } from "../types";

export enum PostType {
  CONTENT = "content",
  EVENT = "event",
  JOB = "job",
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  type: PostType;
  direction: Role;
  likes: number;
  likedBy: User[];
  previewImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePostVariables {
  postId: string;
  post: CreatePostSchema;
}

export interface GetPostsFilters {
  type?: PostType[];
  direction?: Role[];
}
