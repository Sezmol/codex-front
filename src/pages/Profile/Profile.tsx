import { useId, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi, useLoaderData } from "@tanstack/react-router";
import { MapPin, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { useCreatePortfolioItem, useGetUser } from "@/shared/api/users/usersHooks";
import { ProfileEditForm } from "@/widgets/ProfileEditForm";
import { ProjectCard } from "@/widgets/ProjectCard";
import { ProjectForm } from "@/widgets/ProjectForm";
import { UserAvatar } from "@/widgets/UserAvatar";
import { ROLES_TEXT } from "@/shared/constants";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Typography } from "@/shared/ui/Typography";
import { CreatePortfolioItemSchema } from "@/shared/validations/schemas/createPortfolioItemSchema";

import { ProfileSkeleton } from "./ProfileSkeleton";

const route = getRouteApi("/profile/$userId");

export const Profile = () => {
  const currentUser = useLoaderData({ from: "__root__" });

  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);

  const { userId } = route.useParams();

  const queryClient = useQueryClient();

  const { data: user, isPending, isError, error } = useGetUser(userId);
  const { mutate: createPortfolioItem, isPending: isPortfolioItemCreating } =
    useCreatePortfolioItem({
      onSuccess: () => {
        setIsCreateProjectDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: [userId] });
        toast.success("Project created");
      },
      onError: () => {
        toast.error("Error while creating a project, please try again later");
      },
    });

  const projectFormId = useId();

  const onPortfolioItemSubmit = (data: CreatePortfolioItemSchema) => {
    createPortfolioItem(data);
  };

  const isCurrentUser = currentUser?._id === userId;

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (isError && error.status === 400) {
    return (
      <div className="flex flex-col items-center justify-center mt-4">
        <Typography text="User not found" type="h4" />
        <Typography
          text="Please check the URL and try again"
          type="p"
          className="text-muted-foreground"
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-4 border bg-card shadow rounded-xl p-4">
          <div className="flex gap-x-4">
            <UserAvatar src={user.avatar} />

            <div>
              <Typography
                text={`${user.firstName} ${user.lastName}`}
                type="h3"
              />
              <Typography
                text={`@${user.nickname}`}
                className="text-muted-foreground"
              />

              <div className="flex items-center mt-2 gap-x-2">
                <Badge variant="secondary">{ROLES_TEXT[user.role]}</Badge>

                {user.workplace && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin size={16} />
                    {user.workplace}
                  </div>
                )}
              </div>
            </div>

            {isCurrentUser && (
              <ProfileEditForm defaultValues={user} userId={userId} />
            )}
          </div>

          {user.description && (
            <Typography
              text={user.description}
              type="p"
              className="text-muted-foreground"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 border bg-card shadow rounded-xl p-4">
        <>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <Typography text="Portfolio" type="p" className="font-semibold" />
              <Typography
                text={`${user.portfolio?.length || 0} projects`}
                type="p"
                className="text-muted-foreground text-sm"
              />
            </div>

            {isCurrentUser && (
              <Dialog
                open={isCreateProjectDialogOpen}
                onOpenChange={setIsCreateProjectDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon />
                    Add project
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl w-full">
                  <DialogHeader>
                    <DialogTitle>Create a new project</DialogTitle>
                    <DialogDescription>
                      Creating a new project will add it to your portfolio
                    </DialogDescription>
                  </DialogHeader>

                  <ProjectForm
                    formId={projectFormId}
                    onSubmit={onPortfolioItemSubmit}
                  />

                  <DialogFooter className="mt-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateProjectDialogOpen(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      form={projectFormId}
                      type="submit"
                      loading={isPortfolioItemCreating}
                    >
                      Create project
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {user.portfolio?.map((project) => (
              <ProjectCard
                userId={userId}
                key={project._id}
                project={project}
              />
            ))}
          </div>
        </>

        {/* <div className="flex flex-col gap-y-2 justify-center items-center">
            <Typography text="No projects" type="h4" />
          </div> */}
      </div>
    </div>
  );
};
