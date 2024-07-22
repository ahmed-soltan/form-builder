import { HiSave } from "react-icons/hi";
import { Button } from "../ui/button";
import useDesigner from "@/hooks/use-designer";
import { toast } from "../ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      console.log(jsonElements);
      await axios.patch(`/api/forms/${id}`, {content:jsonElements});
      toast({
        title: "Form Updated",
        description: "Your form has been updated successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update form",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSave className="h-4 w-4 mr-2" />
      Save
      {loading && <FaSpinner className="animate-spin ml-2" />}
    </Button>
  );
};

export default SaveFormBtn;
