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
import { useEffect } from "react";
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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";

const type: ElementsType = "spacerField";

const extraAttributes = {
  height: 0,
};

type customType = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const propertiesSchema = z.object({
  height: z.number().min(3).max(200),
});

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as customType;
  const { height } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-slate-700 dark:text-slate-500">
        height Field :{height}px
      </Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
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
  const { height } = element.extraAttributes;
  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      height: height,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);
  
  const onSubmit = (data: z.infer<typeof propertiesSchema>) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height: data.height,
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px): {form.watch("height")}</FormLabel>
              <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={5}
                    max={200}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
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
  const { height } = element.extraAttributes;

  return <div style={{ height, width: "100%" }}></div>;
};

export const SpacerFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes,
  }),
  designerElementBtn: {
    icon: (
      <LuSeparatorHorizontal className="h-8 w-8 cursor-grap text-primary" />
    ),
    label: "Spacer Field",
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
