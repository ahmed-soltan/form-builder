"use client";

import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { BiTrash } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { useTransition } from "react";

const DeleteFormBtn = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const onDelete = async () => {
    try {
      const res = await axios.delete(`/api/forms/${id}`);
      toast({
        title: "Form Deleted",
        description: "Your form has been Deleted successfully",
        variant: "success",
      });
      console.log(res);
      router.push(`/`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={"sm"}
          className=""
          disabled={loading}
        >
          <BiTrash className="w-4 h-4 mr-2" />
          Delete
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
              startTransition(onDelete);
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

export default DeleteFormBtn;
