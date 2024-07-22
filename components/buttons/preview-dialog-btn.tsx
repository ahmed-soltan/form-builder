import useDesigner from "@/hooks/use-designer";
import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FormElementType } from "../form/form-elements";
const PreviewDialogBtn = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <MdPreview className={"w-6 h-6 mr-2"} />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-slate-400">
            Form Preview
          </p>
          <p className="text-sm text-slate-500">
            This is How your Form Will look like to users
          </p>
        </div>
        <div className="flex flex-col flex-grow items-center justify-center p-4
         bg-slate-100 dark:bg-slate-800 bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)] 
         overflow-y-auto">
          <div className="max-w-[620px] flex flex-col flex-grow h-full w-full
           gap-4 rounded-2xl p-8 overflow-y-auto bg-slate-300/70 dark:bg-slate-950">
            {elements.map(element =>{
              const FormComponent = FormElementType[element.type].formComponent;
              return <FormComponent key={element.id} elementInstance={element} />;
            })}
           </div>
         </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
