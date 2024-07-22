"use client";

import { Form } from "@prisma/client";
import SaveFormBtn from "../buttons/save-form-btn";
import PublishFormBtn from "../buttons/publish-form-btn";
import Designer from "./designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import MobileSidebar from "../mobile-sidebar";
import DragOverlayWrapper from "../drag-overlay-wrapper";
import useDesigner from "@/hooks/use-designer";
import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";
import PreviewDialogBtn from "../buttons/preview-dialog-btn";
import DeleteFormBtn from "../buttons/delete-form-btn";

interface FormBuilderProps {
  form: Form;
}

const FormBuilder = ({ form }: FormBuilderProps) => {
  const { setElements } = useDesigner();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setElements(JSON.parse(form.content));
  }, [form, setElements]);

  const shareUrl = `${window.location.origin}/submit/${form.shareLink}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-3xl font-bold text-primary border-b pb-2 mb-10 w-full">
              🎊🎊Form Published🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="hidden md:flex items-center justify-between p-4 gap-2">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-slate-400">Form: </span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <DeleteFormBtn id={form.id} />
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </div>
        <div className="p-4 ml-auto md:hidden flex">
          <MobileSidebar form={form} />
        </div>
        <div
          className="flex w-full flex-grow items-center justify-center relative
           overflow-y-auto h-[200px] bg-slate-100 dark:bg-slate-900 
           bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]"
        >
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
