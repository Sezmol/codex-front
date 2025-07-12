import { useId, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { useCreatePost } from "@/shared/api/posts/postsHooks";
import { Post } from "@/shared/api/posts/postsTypes";
import { POSTS_QUERY_KEY } from "@/shared/api/queryKeys";
import { PostForm } from "@/widgets/PostForm";
import { PostsSkeleton } from "@/widgets/PostsSkeleton";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Typography } from "@/shared/ui/Typography";
import { CreatePostSchema } from "@/shared/validations/schemas/createPostSchema";

import { PostCard } from "./PostCard";

interface PostsContainerProps {
  posts: Post[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const PostsContainer = ({
  posts,
  isError: isPostsError,
  isLoading: isPostsLoading,
}: PostsContainerProps) => {
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formId = useId();

  const { mutate: createPost, isPending: isPostCreating } = useCreatePost({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      setIsDialogOpen(false);
      toast.success("Post created");
    },
    onError: () => {
      toast.error("Error while creating a post, please try again later");
    },
  });

  const onSubmit = (data: CreatePostSchema) => {
    createPost(data);
  };

  const getContent = () => {
    if (isPostsLoading) {
      return <PostsSkeleton />;
    }

    if (isPostsError) {
      return (
        <Typography
          text="Error while loading posts"
          type="p"
          className="self-center text-destructive"
        />
      );
    }

    if (posts?.length) {
      return posts.map((post) => <PostCard key={post._id} post={post} />);
    }

    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Typography text="No posts yet" type="h3" />
        <Typography text="You can be the first one" type="p" />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-4 grow">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Typography text="Create post" /> <PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create post</DialogTitle>
            <DialogDescription>
              Fill in the form to create a post
            </DialogDescription>
          </DialogHeader>

          <PostForm onSubmit={onSubmit} formId={formId} />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button form={formId} type="submit" loading={isPostCreating}>
              {isPostCreating ? "Creating..." : "Create post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-4 grow max-w-[880px]">
        {getContent()}
      </div>
    </div>
  );
};
