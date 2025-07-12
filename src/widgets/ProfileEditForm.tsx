import { useId, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SquarePenIcon } from "lucide-react";
import { toast } from "sonner";

import { useUpdateUser } from "@/shared/api/users/usersHooks";
import { ROLES_OPTIONS } from "@/shared/constants";
import { useFormCreation } from "@/shared/hooks/useFormCreation";
import { BaseSelect } from "@/shared/ui/BaseSelect";
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
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  EditProfileSchema,
  editProfileSchema,
} from "@/shared/validations/schemas/editProfileSchema";

interface ProfileEditFormProps {
  defaultValues: EditProfileSchema;
  userId: string;
}

export const ProfileEditForm = ({
  defaultValues,
  userId,
}: ProfileEditFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [{ handleSubmit, setError }, { Form, FormItem }] = useFormCreation({
    schema: editProfileSchema,
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUserUpdating } = useUpdateUser({
    onSuccess: (response) => {
      queryClient.setQueryData([userId], response);
      setIsDialogOpen(false);
      toast.success("Profile updated");
    },
    onError: ({ status, response }) => {
      const data = response?.data;

      if (status === 409 && data) {
        setError(data.field, { message: data.message });
        return;
      }

      toast.error("Error while updating profile, please try again later");
    },
  });

  const formId = useId();

  const onSubmit = (data: EditProfileSchema) => {
    updateUser(data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <SquarePenIcon />
          Edit profile
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
          id={formId}
        >
          <div className="flex gap-x-2 items-start">
            <FormItem name="firstName" label="First name" className="w-full">
              {(field) => (
                <Input {...field} placeholder="Enter your first name" />
              )}
            </FormItem>

            <FormItem name="lastName" label="Last name" className="w-full">
              {(field) => (
                <Input {...field} placeholder="Enter your last name" />
              )}
            </FormItem>
          </div>

          <FormItem name="role" label="Role">
            {(field) => (
              <BaseSelect
                options={ROLES_OPTIONS}
                placeholder="Choose role"
                {...field}
              />
            )}
          </FormItem>

          <FormItem name="nickname" label="Nickname">
            {(field) => <Input {...field} placeholder="Enter your nickname" />}
          </FormItem>

          <FormItem name="email" label="Email">
            {(field) => <Input {...field} placeholder="Enter your email" />}
          </FormItem>

          <FormItem name="workplace" label="Workplace">
            {(field) => <Input {...field} placeholder="Enter your workplace" />}
          </FormItem>

          <FormItem name="description" label="Description">
            {(field) => (
              <Textarea {...field} placeholder="Enter your description" />
            )}
          </FormItem>
        </Form>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>

          <Button form={formId} type="submit" loading={isUserUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
