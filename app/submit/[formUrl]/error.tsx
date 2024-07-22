"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { LuShieldAlert } from "react-icons/lu";

const error = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
        <p className="text-rose-500 text-4xl flex items-center gap-2">
        <LuShieldAlert/>
      Something went wrong
        </p>
      <Button asChild>
        <Link href={"/"}>Go Back to Home</Link>
      </Button>
    </div>
  );
};

export default error;
