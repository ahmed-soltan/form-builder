import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FormElementInstance, FormElementType } from "./form-elements";
import { AiOutlineClose } from "react-icons/ai";
const PropertiesFormSidebar = ({
  selectedElement,
  setSelectedElement
}: {
  selectedElement: FormElementInstance;
  setSelectedElement: React.Dispatch<
  React.SetStateAction<FormElementInstance | null>>
}) => {
  const PropertiesForm =
    FormElementType[selectedElement.type].propertiesComponent;
  return (
    <div className="flex flex-col w-full gap-4 p-2">
      <div className="flex items-center justify-between">
        <p className="text-slate-700 dark:text-zinc-400 text-sm">Form Properties</p>
        <Button className="" size={"icon"} variant={"ghost"} onClick={()=>setSelectedElement(null)}>
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4 bg-slate-400 dark:bg-slate-300"/>
      <PropertiesForm elementInstance={selectedElement}/>
    </div>
  );
};

export default PropertiesFormSidebar;
