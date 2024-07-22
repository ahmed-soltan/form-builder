"use client";
import { cn } from "@/lib/utils";
import DesignerSidebar from "./designer-sidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  ElementsType,
  FormElementInstance,
  FormElementType,
} from "./form-elements";
import useDesigner from "@/hooks/use-designer";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: "form-builder",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;
      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      const isDroppingOverDesignerArea = over.data.current?.isDesignerDropArea;

      console.log(isDroppingOverDesignerArea);

      if (isDesignerBtnElement && isDroppingOverDesignerArea) {
        if (isDesignerBtnElement) {
          const type = active.data.current?.type;
          const newElement = FormElementType[type as ElementsType].construct(
            idGenerator()
          );

          addElement(elements.length, newElement);

          console.log("NEW_ELEMENT :", newElement);
        }
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarOverDesignerElement) {
        const type = active.data.current?.type;
        const newElement = FormElementType[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over?.data?.current?.elementId;
        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );

        if (overElementIndex === -1) {
          throw new Error("Invalid element ID");
        }

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement += 1;
        }

        addElement(indexForNewElement, newElement);

        console.log("NEW_ELEMENT :", newElement);
      }
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={(e) => {
          e.stopPropagation();
          selectedElement && setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "dark:bg-slate-950 bg-slate-100 max-w-[920px] h-full m-auto rounded-xl ring-4 ring-slate-500 dark:ring-slate-700 ring-inset",
            "flex flex-col flex-grow items-center justify-center flex-1",
            "overflow-y-auto",
            droppable.isOver && "ring-4 dark:ring-white ring-slate-500 ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-slate-600 dark:text-slate-400 flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full h-full">
              <div className="h-[120px] rounded-md bg-slate-400 dark:bg-slate-800"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-1 p-4 h-full">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <DesignerSidebar />
      </div>
    </div>
  );
};

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const DesignerElement = FormElementType[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + `-top`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + `-bottom`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) {
    return null;
  }


  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className="relative flex flex-col h-[150px] hover:cursor-pointer ring-1 dark:ring-slate-400 ring-slate-500 
       ring-inset rounded-md"
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn("absolute  w-full h-1/2 rounded-t-md")}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      ></div>
      {isMouseOver && (
        <>
          <div className="absolute right-0 h-full z-40">
            <Button
              className="flex items-center justify-center h-full border 
              rounded-md border-l-none "
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="w-6 h-6 " />
            </Button>
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 
          -translate-y-1/2 animate-pulse"
          >
            <p>Click for Properties or drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-slate-600 dark:bg-white" />
      )}
      <div
        className={cn(
          "flex w-full h-[150px] items-center rounded-md px-4",
          "py-2 pointer-events-none opacity-100",
          isMouseOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-slate-600 dark:bg-white" />
      )}
    </div>
  );
};

export default Designer;
