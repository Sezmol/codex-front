import { MouseEvent } from "react";
import { Plus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { PortfolioLinkType } from "@/shared/api/types";
import { LINKS_TYPES_OPTIONS } from "@/shared/constants";
import { useFormCreation } from "@/shared/hooks/useFormCreation";
import { BaseSelect } from "@/shared/ui/BaseSelect";
import { Button } from "@/shared/ui/button";
import { FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  CreatePortfolioItemSchema,
  createPortfolioItemSchema,
} from "@/shared/validations/schemas/createPortfolioItemSchema";

interface ProjectFormProps {
  formId: string;
  onSubmit: (data: CreatePortfolioItemSchema) => void;
  defaultValues?: CreatePortfolioItemSchema;
}

const DEFAULT_VALUES: CreatePortfolioItemSchema = {
  title: "",
  description: "",
  previewImage: "",
  links: [
    {
      type: PortfolioLinkType.CODE,
      url: "",
      label: "",
    },
  ],
};

export const ProjectForm = ({
  defaultValues,
  formId,
  onSubmit,
}: ProjectFormProps) => {
  const [{ control, handleSubmit }, { Form, FormItem }] = useFormCreation({
    schema: createPortfolioItemSchema,
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onAppendClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ type: PortfolioLinkType.CODE, url: "", label: "" });
  };

  return (
    <Form
      className="flex flex-col gap-y-4"
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormItem name="title" label="Title">
        {(field) => <Input {...field} placeholder="Project title" />}
      </FormItem>

      <FormItem name="description" label="Description">
        {(field) => <Textarea {...field} placeholder="Project description" />}
      </FormItem>

      <div className="flex items-center justify-between">
        <FormLabel>Links (Optional, max 3)</FormLabel>
        {fields.length < 3 && (
          <Button variant="outline" onClick={onAppendClick}>
            <Plus className="h-4 w-4" />
            Add Link
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        {fields.map((_, i) => (
          <div key={`links.${i}.type`} className="flex gap-x-2">
            <FormItem name={`links.${i}.type`} className="w-[100px]">
              {(field) => (
                <BaseSelect
                  {...field}
                  options={LINKS_TYPES_OPTIONS}
                  className="w-[100px]"
                />
              )}
            </FormItem>

            <FormItem name={`links.${i}.url`} className="w-full">
              {(field) => (
                <Input {...field} placeholder="URL: https://url.com" />
              )}
            </FormItem>

            <FormItem name={`links.${i}.label`} className="w-full">
              {(field) => <Input {...field} placeholder="Link label" />}
            </FormItem>

            <Button
              size="icon"
              variant="outline"
              onClick={() => remove(i)}
              disabled={fields.length === 1}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </Form>
  );
};
