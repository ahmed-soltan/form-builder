import { useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { FormElement } from "../form/form-elements";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { designerElementBtn } = formElement;

  const { label, icon } = designerElementBtn;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        "flex flex-col items-center gap-2 h-[120px] w-[120px] cursor-grap",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant={"outline"}
    >
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { designerElementBtn } = formElement;

  const { label, icon } = designerElementBtn;

  return (
    <Button
      variant={"outline"}
      className="flex flex-col items-center gap-2 h-[120px] w-[120px] cursor-grap"
    >
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
};
