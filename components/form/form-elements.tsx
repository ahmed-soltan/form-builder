import { NumberFieldFormComponent } from "../fields/number-field";
import { ParagraphFieldFormComponent } from "../fields/paragraph-field";
import { SeparatorFieldFormComponent } from "../fields/separator-field";
import { SpacerFieldFormComponent } from "../fields/spacer-field";
import { SubTitleFieldFormComponent } from "../fields/subTitle-field";
import { TextFieldFormElement } from "../fields/text-field";
import { TextAreaFormComponent } from "../fields/textarea-field";
import { TitleFieldFormComponent } from "../fields/title-field";

export type ElementsType =
  | "textField"
  | "titleField"
  | "subTitleField"
  | "paragraphField"
  | "separatorField"
  | "spacerField"
  | "numberField"
  | "textArea"

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerElementBtn: {
    icon: React.ReactNode;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElementType: FormElementsType = {
  textField: TextFieldFormElement,
  titleField: TitleFieldFormComponent,
  subTitleField: SubTitleFieldFormComponent,
  paragraphField: ParagraphFieldFormComponent,
  separatorField: SeparatorFieldFormComponent,
  spacerField: SpacerFieldFormComponent,
  numberField: NumberFieldFormComponent,
  textArea: TextAreaFormComponent,
};
