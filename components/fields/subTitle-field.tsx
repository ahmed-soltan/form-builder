"use client";

import { MdTextFields } from "react-icons/md";
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
import { LuHeading1, LuHeading2 } from "react-icons/lu";

const type: ElementsType = "subTitleField";

const extraAttributes = {
  subTitle: "Subtitle Field",
};
type customType = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const propertiesSchema = z.object({
  subTitle: z.string().min(3).max(50),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as customType;
  const { subTitle } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-slate-700 dark:text-slate-500">subTitle Field</Label>
      <p className="text-md text-slate-700 dark:text-slate-300">{subTitle}</p>
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
  const { subTitle} = element.extraAttributes;
  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      subTitle: subTitle,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);

  const onSubmit = (data: z.infer<typeof propertiesSchema>) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        subTitle: data.subTitle,
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
          name="subTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>subTitle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="subTitle"
                  type="text"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as customType;
  const { subTitle } = element.extraAttributes;

  return (
    <p className="text-md text-slate-700 dark:text-slate-500">{subTitle}</p>
  );
};

export const SubTitleFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes,
  }),
  designerElementBtn: {
    icon: <LuHeading2 className="h-8 w-8 cursor-grap text-primary" />,
    label: "SubTitle Field",
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
