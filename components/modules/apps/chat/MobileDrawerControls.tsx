import React from "react";
import { Settings } from "lucide-react";

import { Chat } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { SheetTrigger } from "@/components/ui/Sheet";

import { ChatHistoryDrawer } from "./ChatHistoryDrawer";

type MobileDrawerControlProps = {
  chats: Chat[] | null;
};

export const MobileDrawerControl = React.memo(function MobileDrawerControl({
  chats,
}: MobileDrawerControlProps) {
  return (
    <>
      <div className="absolute bottom-0 left-0 flex w-1/2 px-2 pb-2 lg:hidden">
        <ChatHistoryDrawer data={chats} />
      </div>
      <div className="absolute bottom-0 left-12 flex w-1/2 justify-start px-2 pb-2 lg:hidden">
        <SheetTrigger asChild>
          <Button size="sm" variant="ghost">
            <Settings />
          </Button>
        </SheetTrigger>
      </div>
    </>
  );
});
