import { JSX, useId, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

import { useDeletePost, useUpdatePost } from "@/api/posts/postsHooks";
import { Post } from "@/api/posts/postsTypes";
import { POSTS_QUERY_KEY } from "@/api/queryKeys";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { CreatePostSchema } from "@/validations/schemas/createPostSchema";

import { PostForm } from "../PostForm";

interface DialogContentProps {
  onSubmit: (data?: CreatePostSchema) => void;
  isPending: boolean;
  formId?: string;
  defaultValues?: CreatePostSchema;
}

type DialogContentType = "delete" | "edit";

const dialogContents: Record<
  DialogContentType,
  (props: DialogContentProps) => JSX.Element | null
> = {
  delete: ({ onSubmit, isPending }: DialogContentProps) => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete post?</DialogTitle>
        <DialogDescription>This action cannot be undone</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button
          variant="destructive"
          onClick={() => onSubmit()}
          loading={isPending}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  ),
  edit: ({ isPending, onSubmit, formId, defaultValues }: DialogContentProps) =>
    formId && defaultValues ? (
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update post</DialogTitle>
          <DialogDescription>
            Fill in the form to update a post
          </DialogDescription>
        </DialogHeader>

        <PostForm
          onSubmit={onSubmit}
          formId={formId}
          defaultValues={defaultValues}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button form={formId} type="submit" loading={isPending}>
            {isPending ? "Updating..." : "Update post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    ) : null,
};

interface CardActionsProps {
  post: Post;
}

export const CardActions = ({ post }: CardActionsProps) => {
  const formId = useId();

  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContentType, setDialogContentType] =
    useState<DialogContentType | null>(null);

  const { mutate: deletePost, isPending: isPendingDelete } = useDeletePost({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      toast.success("Post deleted");
    },
    onError: () => {
      toast.error("Error while deleting a post, please try again later");
    },
  });

  const { mutate: updatePost, isPending: isPendingUpdate } = useUpdatePost({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      toast.success("Post updated");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Error while updating a post, please try again later");
    },
  });

  const isPending = isPendingDelete || isPendingUpdate;

  const handleSubmit = (data?: CreatePostSchema) => {
    if (dialogContentType === "edit" && data) {
      updatePost({ postId: post._id, post: data });
    } else {
      deletePost(post._id);
    }
  };

  const CurrentDialogContent =
    dialogContentType && dialogContents[dialogContentType];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="ml-auto h-6">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setDialogContentType("edit")}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDialogContentType("delete")}
            >
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {CurrentDialogContent && (
        <CurrentDialogContent
          isPending={isPending}
          onSubmit={handleSubmit}
          formId={formId}
          defaultValues={post}
        />
      )}
    </Dialog>
  );
};
