import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { ElementsType, FormElementType } from "./form/form-elements";
import useDesigner from "@/hooks/use-designer";
import { cn } from "@/lib/utils";
import { SidebarBtnElementDragOverlay } from "./buttons/sidebar-btn-element";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>No Drag Overlay</div>;
  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data.current?.type as ElementsType;

    node = <SidebarBtnElementDragOverlay formElement={FormElementType[type]} />;
  }

  const isDesignerElement = draggedItem?.data.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem?.data.current?.elementId;
    const element = elements.find((element) => element.id === elementId);

    if (!element) node = <div>Element Not Found</div>;
    else {
      const DesignerElementComponent =
        FormElementType[element.type].designerComponent;

      node = (
        <div
          className={cn(
            "flex w-full h-[120px] border border-slate-700 items-center rounded-md px-4",
            "py-2 pointer-events-none opacity-80"
          )}
        >
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
