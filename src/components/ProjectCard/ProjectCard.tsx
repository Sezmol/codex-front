import { useId, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLoaderData } from "@tanstack/react-router";
import { SquarePen, Trash } from "lucide-react";
import { toast } from "sonner";

import { Portfolio } from "@/api/types";
import {
  useDeletePortfolioItem,
  useUpdatePortfolioItem,
} from "@/api/users/usersHooks";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Typography } from "@/ui/Typography";
import { CreatePortfolioItemSchema } from "@/validations/schemas/createPortfolioItemSchema";

import { ProjectForm } from "../ProjectForm";
import { ProjectLink } from "./ProjectLink";

interface ProjectCardProps {
  project: Portfolio;
  userId: string;
}

export const ProjectCard = ({ project, userId }: ProjectCardProps) => {
  const currentUser = useLoaderData({ from: "__root__" });

  const formId = useId();

  const { title, description, previewImage, links } = project;

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: deletePortfolioItem, isPending: isPortfolioItemDeleting } =
    useDeletePortfolioItem({
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setIsProjectModalOpen(false);
        queryClient.invalidateQueries({ queryKey: [userId] });
        toast.success("Project deleted");
      },
      onError: () => {
        toast.error("Error while deleting a project, please try again later");
      },
    });
  const { mutate: updatePortfolioItem, isPending: isPortfolioItemUpdating } =
    useUpdatePortfolioItem({
      onSuccess: () => {
        setIsEditDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: [userId] });
        toast.success("Project updated");
      },
      onError: () => {
        toast.error("Error while updating a project, please try again later");
      },
    });

  const onDeleteClick = () => {
    setIsDeleteDialogOpen(false);
    deletePortfolioItem(project._id);
  };

  const onUpdateClick = (data: CreatePortfolioItemSchema) => {
    updatePortfolioItem({ data: data, id: project._id });
    setIsEditDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogTrigger asChild>
          <div className="border bg-card shadow rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
            {previewImage && (
              <img
                src={previewImage}
                alt="Project preview"
                className="rounded-t-xl w-full object-cover max-h-80"
              />
            )}

            <div className="p-4 flex flex-col gap-y-2">
              <div>
                <Typography text={title} type="h4" />
                {description && (
                  <Typography
                    text={description}
                    type="p"
                    className="text-muted-foreground"
                  />
                )}
              </div>

              <div className="flex gap-x-2 flex-wrap">
                {links?.map((link, i) => (
                  <ProjectLink
                    key={i}
                    linkType={link.type}
                    projectLink={link}
                    type="badge"
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className={cn(!description && "sr-only")}>
              {description}
            </DialogDescription>
          </DialogHeader>

          {previewImage && (
            <img
              src={previewImage}
              alt="Project preview"
              className="w-full object-cover max-h-80"
            />
          )}

          <div className="flex flex-col gap-y-2">
            <Typography type="h5" text="Links" />
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {links?.map((link, i) => (
                <ProjectLink key={i} linkType={link.type} projectLink={link} />
              ))}
            </div>
          </div>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
              <DialogHeader>
                <DialogTitle>Delete project</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="destructive"
                  onClick={onDeleteClick}
                  loading={isPortfolioItemDeleting}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl w-full">
              <DialogHeader>
                <DialogTitle>Edit project</DialogTitle>
                <DialogDescription>
                  You can edit the project details here
                </DialogDescription>
              </DialogHeader>

              <ProjectForm
                formId={formId}
                onSubmit={onUpdateClick}
                defaultValues={project}
              />

              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form={formId}
                  loading={isPortfolioItemUpdating}
                >
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {currentUser?._id === userId && (
            <DialogFooter className="mt-2">
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash />
                Delete project
              </Button>
              <Button onClick={() => setIsEditDialogOpen(true)}>
                <SquarePen />
                Edit project
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
