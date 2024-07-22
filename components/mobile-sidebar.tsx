import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Form } from "@prisma/client";
import { Button } from "./ui/button";
import { HiMenu } from "react-icons/hi";
import { Separator } from "./ui/separator";
import SaveFormBtn from "./buttons/save-form-btn";
import PublishFormBtn from "./buttons/publish-form-btn";
import DesignerSidebar from "./form/designer-sidebar";
import PreviewDialogBtn from "./buttons/preview-dialog-btn";

const MobileSidebar = ({ form }: { form: Form }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <HiMenu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-start gap-4 px-2">
        <SheetHeader>
          <SheetTitle>
            <h2 className="truncate font-medium">
              <span className="mr-2 text-slate-400">Form: </span>
              {form.name}
            </h2>
          </SheetTitle>
        </SheetHeader>
        <Separator/>
        <div className="flex flex-col gap-2 w-full h-full">
        <div className="flex items-center gap-2 flex-wrap">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id}  />
              </>
            )}
          </div>
          <DesignerSidebar/>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
