"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

type NewChatButtonProps = {
  closeDrawer?: () => void;
};

export const NewChatButton = ({ closeDrawer }: NewChatButtonProps) => {
  return (
    <Link
      href="/apps/chat"
      className={cn(
        buttonVariants({
          size: "sm",
          variant: "outline",
        })
      )}
      onClick={closeDrawer}
    >
      <Plus size={16} />
    </Link>
  );
};
