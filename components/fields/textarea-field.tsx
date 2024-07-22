"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../form/form-elements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/use-designer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type: ElementsType = "textArea";

const extraAttributes = {
  label: "Textarea Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Value Here...",
  rows: "3",
};
type customType = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const propertiesSchema = z.object({
  label: z.string().min(3).max(50),
  helperText: z.string().optional(),
  placeHolder: z.string().max(50),
  required: z.boolean().optional().default(false),
  rows: z.string().min(1).max(1),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as customType;
  const { label, helperText, placeHolder, required, rows } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </Label>
      <Textarea readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-zinc-600 dark:text-zinc-500 text-[.8rem]">
          {helperText}
        </p>
      )}
    </div>
  );
};

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as customType;
  const { updateElement } = useDesigner();
  const { label, helperText, placeHolder, required, rows } =
    element.extraAttributes;
  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: label,
      helperText: helperText,
      placeHolder: placeHolder,
      required: required,
      rows: rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);
  const onSubmit = (data: z.infer<typeof propertiesSchema>) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: data.label,
        helperText: data.helperText,
        placeHolder: data.placeHolder,
        required: data.required,
        rows: data.rows,
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="space-y-8 border border-slate-500 p-4 rounded-md"
        onBlur={form.handleSubmit(onSubmit)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Label"
                  type="text"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                The Label of the field it will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Placeholder</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="placeHolder"
                  type="text"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>The placeHolder of the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field HelperText</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Helper Text"
                  type="text"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                The helperText of the field it will be displayed below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Rows</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Rows"
                  type="number"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                The Rows Field specify the height of textarea field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem
              className="flex items-center justify-between rounded-lg
             border p-3 shadow-sm border-slate-400"
            >
              <div className="space-y-.5">
                <FormLabel>Required</FormLabel>

                <FormDescription>
                  Choose Whether This field is Required or Not.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: (key: string, value: string) => void;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const element = elementInstance as customType;
  const { label, helperText, placeHolder, required, rows } =
    element.extraAttributes;

  useEffect(() => {
    if (isInvalid) setError(true);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error ? "text-rose-500" : "")}>
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </Label>
      <Textarea
        className={cn(error ? "border border-rose-500" : "")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;

          const valid = TextAreaFormComponent.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, value);
        }}
        value={value}
        rows={parseInt(rows)}
      />
      {helperText && (
        <p
          className={cn(
            "text-zinc-600 dark:text-zinc-500 text-[.8rem]",
            error ? "text-rose-500" : ""
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export const TextAreaFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes,
  }),
  designerElementBtn: {
    icon: <BsTextareaResize className="h-8 w-8 cursor-grap text-primary" />,
    label: "Textarea Field",
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as customType;
    if (element.extraAttributes.required) {
      return currentValue.trim().length > 0;
    }

    return true;
  },
};
