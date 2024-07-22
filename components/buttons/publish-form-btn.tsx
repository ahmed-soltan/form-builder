import { MdPublish } from "react-icons/md";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
const PublishFormBtn = ({id}:{id:number}) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter()
  const publishForm = async () => {
    try {
      await axios.patch(`/api/forms/${id}`, {
        published: true,
      });
      toast({
        title: "Form Updated",
        description: "Your form has been Published successfully",
        variant: "success",
      });
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to Publish form",
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
          disabled={loading}
        >
          <MdPublish className="w-4 h-4 mr-2" />
          Publish
          {loading && <FaSpinner className="ml-2 animate-spin" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(publishForm);
            }}
          >
            Proceed
            {loading && <FaSpinner className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
