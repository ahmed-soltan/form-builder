import SidebarBtnElement from "../buttons/sidebar-btn-element";
import { Separator } from "../ui/separator";
import { FormElementType } from "./form-elements";

const FormElementsSidebar = () => {
  return (
    <div>
      <p className="text-sm text-slate-700 dark:text-slate-500">
        Drag and Drop Elements
      </p>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-slate-700 dark:text-slate-500 place-self-start
         col-span-1 md:col-span-2 my-2">
          Layout Elements
        </p>
        <SidebarBtnElement formElement={FormElementType.titleField} />
        <SidebarBtnElement formElement={FormElementType.subTitleField} />
        <SidebarBtnElement formElement={FormElementType.paragraphField} />
        <SidebarBtnElement formElement={FormElementType.separatorField} />
        <SidebarBtnElement formElement={FormElementType.spacerField} />
      </div>
      
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-slate-700 dark:text-slate-500 place-self-start
         col-span-1 md:col-span-2 my-2">
          Form Elements
        </p>
        <SidebarBtnElement formElement={FormElementType.textField} />
        <SidebarBtnElement formElement={FormElementType.numberField} />
        <SidebarBtnElement formElement={FormElementType.textArea} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
