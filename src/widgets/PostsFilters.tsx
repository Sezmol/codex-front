import { useNavigate } from "@tanstack/react-router";

import { DIRECTION_OPTIONS, TYPE_OPTIONS } from "@/shared/constants";
import { useFormCreation } from "@/shared/hooks/useFormCreation";
import { Route } from "@/app/routes";
import { Button } from "@/shared/ui/button";
import { MultiSelect } from "@/shared/ui/multi-select";
import { Typography } from "@/shared/ui/Typography";
import {
  PostsSearchSchema,
  postsSearchSchema,
} from "@/shared/validations/schemas/postsFiltersSchema";

interface PostsFiltersProps {
  initialFilters?: PostsSearchSchema;
  disabled?: boolean;
}

const filteredFilters = (filters: PostsSearchSchema) =>
  Object.entries(filters).reduce<Record<string, string[]>>(
    (acc, [key, value]) => {
      if (value && value.length) {
        acc[key] = value;
      }

      return acc;
    },
    {},
  );

export const PostsFilters = ({
  initialFilters,
  disabled,
}: PostsFiltersProps) => {
  const navigate = useNavigate({ from: Route.fullPath });
  const [{ handleSubmit, reset }, { Form, FormItem }] = useFormCreation({
    schema: postsSearchSchema,
    defaultValues: initialFilters,
    disabled,
  });

  const onSubmit = (data: PostsSearchSchema) => {
    navigate({ search: (prev) => filteredFilters({ ...prev, ...data }) });
  };

  const resetFilters = () => {
    reset({
      direction: [],
      type: [],
    });
    navigate({ search: undefined });
  };

  return (
    <div className="flex flex-col gap-y-2 max-w-[300px] w-full sticky top-[89px] h-fit">
      <Typography type="h4" text="Filters" className="text-center" />

      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <FormItem name="direction" label="Direction">
          {(field) => (
            <MultiSelect
              options={DIRECTION_OPTIONS}
              value={field.value as string[]}
              onValueChange={field.onChange}
              placeholder="Direction"
              maxCount={3}
            />
          )}
        </FormItem>

        <FormItem name="type" label="Type">
          {(field) => (
            <MultiSelect
              options={TYPE_OPTIONS}
              value={field.value as string[]}
              onValueChange={field.onChange}
              placeholder="Type"
              maxCount={3}
            />
          )}
        </FormItem>

        <Button disabled={disabled} type="submit">
          Apply filters
        </Button>
        <Button disabled={disabled} type="reset" onClick={resetFilters}>
          Reset
        </Button>
      </Form>
    </div>
  );
};
