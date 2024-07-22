"use client";

import { RiSeparator } from "react-icons/ri";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../form/form-elements";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const type: ElementsType = "separatorField";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-slate-700 dark:text-slate-500">
        Separator Field
      </Label>
      <Separator />
    </div>
  );
};

const PropertiesComponent = () => {
  return <p className="text-slate-700 dark:text-slate-500">No Properties For this Element</p>;
};

const FormComponent = () => {
  return <Separator />;
};

export const SeparatorFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerElementBtn: {
    icon: <RiSeparator className="h-8 w-8 cursor-grap text-primary" />,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
