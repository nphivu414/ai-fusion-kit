import React from "react";
import { Message, UseChatHelpers } from "ai/react";
import { FormProvider, FormProviderProps } from "react-hook-form";

import { SheetContent } from "@/components/ui/Sheet";

import { ChatPanelProps } from "../ChatPanel";
import { ChatParams } from "../types";
import { ControlSidebar } from "./ControlSidebar";

type ControlSidebarSheetProps = {
  setMessages: UseChatHelpers["setMessages"];
  messages: Message[];
  closeSidebarSheet: () => void;
  isNewChat: ChatPanelProps["isNewChat"];
  formReturn: Omit<FormProviderProps<ChatParams>, "children">;
};

export const ControlSidebarSheet = React.memo(function ControlSidebarSheet({
  setMessages,
  messages,
  closeSidebarSheet,
  isNewChat,
  formReturn,
}: ControlSidebarSheetProps) {
  const renderControlSidebar = () => {
    return (
      <ControlSidebar
        setMessages={setMessages}
        messages={messages}
        closeSidebarSheet={closeSidebarSheet}
        isNewChat={isNewChat}
      />
    );
  };

  return (
    <FormProvider {...formReturn}>
      <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
        <div className="pt-4">{renderControlSidebar()}</div>
      </SheetContent>
      <div className="size-0 overflow-x-hidden transition-[width] lg:h-auto lg:max-h-[calc(100vh_-_65px)] lg:w-[450px] lg:border-x">
        {renderControlSidebar()}
      </div>
    </FormProvider>
  );
});
