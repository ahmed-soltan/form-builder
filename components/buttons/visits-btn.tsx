"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BiLinkExternal } from "react-icons/bi";

const VisitBtn = ({ shareLink }: { shareLink: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const shareUrl = `${window.location.origin}/submit/${shareLink}`;

  return (
    <Button
    size={"sm"}
      onClick={() => {
        window.open(shareUrl, "_blank");
      }}
    >
      <span className="hidden sm:block">Visit</span>
      <BiLinkExternal className="sm:ml-2"/>
    </Button>
  );
};

export default VisitBtn;
