"use client";
import useDesigner from "@/hooks/use-designer";
import FormElementsSidebar from "./form-elements-sidebar";
import PropertiesFormSidebar from "./properties-form-sidebar";

const DesignerSidebar = () => {
  const { selectedElement , setSelectedElement } = useDesigner();
  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
      p-4 overflow-y-auto h-full bg-slate-200 dark:bg-slate-950 "
    >
      {!selectedElement && (
        <FormElementsSidebar/>
      )}
      {selectedElement && (
        <PropertiesFormSidebar selectedElement={selectedElement} setSelectedElement={setSelectedElement}/>
      )}
    </aside>
  );
};

export default DesignerSidebar;
