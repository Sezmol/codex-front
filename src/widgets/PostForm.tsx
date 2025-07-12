import { PostType } from "@/shared/api/posts/postsTypes";
import { DIRECTION_OPTIONS, TYPE_OPTIONS } from "@/shared/constants";
import { useFormCreation } from "@/shared/hooks/useFormCreation";
import { Role } from "@/shared/types/enums";
import { BaseSelect } from "@/shared/ui/BaseSelect";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  CreatePostSchema,
  createPostSchema,
} from "@/shared/validations/schemas/createPostSchema";

const DEFAULT_VALUES: CreatePostSchema = {
  title: "",
  content: "",
  direction: Role.FRONT_DEV,
  type: PostType.CONTENT,
};

interface PostFormProps {
  formId: string;
  onSubmit: (data: CreatePostSchema) => void;
  defaultValues?: CreatePostSchema;
}

export const PostForm = ({
  onSubmit,
  formId,
  defaultValues,
}: PostFormProps) => {
  const [{ handleSubmit }, { Form, FormItem }] = useFormCreation({
    schema: createPostSchema,
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });

  return (
    <Form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-3"
    >
      <FormItem name="title" label="Title">
        {(field) => <Input {...field} placeholder="Title" />}
      </FormItem>

      <FormItem name="content" label="Content">
        {(field) => (
          <Textarea className="max-h-[40vh]" {...field} placeholder="Content" />
        )}
      </FormItem>

      <div className="flex gap-x-2 justify-between">
        <FormItem className="w-full" name="direction" label="Direction">
          {(field) => <BaseSelect {...field} options={DIRECTION_OPTIONS} />}
        </FormItem>

        <FormItem className="w-full" name="type" label="Type">
          {(field) => <BaseSelect {...field} options={TYPE_OPTIONS} />}
        </FormItem>
      </div>
    </Form>
  );
};
