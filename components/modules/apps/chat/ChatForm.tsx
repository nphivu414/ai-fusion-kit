import React from "react";
import { Anchor } from "@radix-ui/react-popover";
import { SendHorizonal } from "lucide-react";

import { Chat } from "@/lib/db";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { Button } from "@/components/ui/Button";
import { ChatInput } from "@/components/ui/chat";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { MobileDrawerControl } from "./MobileDrawerControls";

type ChatFormProps = {
  chatInput: string;
  chats: Chat[] | null;
  isChatStreamming: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export const ChatForm = ({
  chats,
  isChatStreamming,
  chatInput,
  onSubmit,
  onInputChange,
}: ChatFormProps) => {
  const { formRef, onKeyDown } = useEnterSubmit();

  return (
    <Popover>
      <div className="fixed bottom-0 left-0 w-full bg-background p-4 lg:relative lg:mt-2 lg:bg-transparent lg:py-0">
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent side="top" align="start">
          test
        </PopoverContent>
        <form onSubmit={onSubmit} className="relative" ref={formRef}>
          <ChatInput
            value={chatInput}
            onKeyDown={onKeyDown}
            onChange={onInputChange}
          />
          <MobileDrawerControl chats={chats} />
          <div className="absolute bottom-0 right-0 flex w-1/2 justify-end px-2 pb-2">
            <Button size="sm" type="submit" disabled={isChatStreamming}>
              Send
              <SendHorizonal size={14} className="ml-1" />
            </Button>
          </div>
        </form>
      </div>
    </Popover>
  );
};
