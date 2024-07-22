"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ImShare } from "react-icons/im";

const FormShareLink = ({ shareLink }: { shareLink: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const shareUrl = `${window.location.origin}/submit/${shareLink}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input className="w-full" readOnly value={shareUrl} />
      <Button
        className="mt-2 max-w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Copied!",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2" />
        Share Link
      </Button>
    </div>
  );
};

export default FormShareLink;
