import React from "react";
import { Message, UseChatHelpers } from "ai/react";
import { FormProvider, FormProviderProps } from "react-hook-form";

import {
  CHAT_MEMBER_SIDEBAR_LAYOUT_COOKIE,
  MAX_CHAT_MEMBER_SIDEBAR_SIZE,
  MIN_CHAT_MEMBER_SIDEBAR_SIZE,
} from "@/lib/contants";
import { ChatMemberProfile } from "@/lib/db";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import { SheetContent } from "@/components/ui/Sheet";

import { ChatMembers } from "../chat-members";
import { ChatPanelProps } from "../ChatPanel";
import { ChatParams } from "../types";
import { ControlSidebar } from "./ControlSidebar";

type ControlSidebarSheetProps = {
  setMessages: UseChatHelpers["setMessages"];
  messages: Message[];
  chatMembers: ChatMemberProfile[] | null;
  closeSidebarSheet: () => void;
  isNewChat: ChatPanelProps["isNewChat"];
  isChatHost: ChatPanelProps["isChatHost"];
  formReturn: Omit<FormProviderProps<ChatParams>, "children">;
  defaultMemberSidebarLayout: number[];
};

export const ControlSidebarSheet = React.memo(function ControlSidebarSheet({
  setMessages,
  messages,
  chatMembers,
  closeSidebarSheet,
  isNewChat,
  isChatHost,
  formReturn,
  defaultMemberSidebarLayout,
}: ControlSidebarSheetProps) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `${CHAT_MEMBER_SIDEBAR_LAYOUT_COOKIE}=${JSON.stringify(sizes)}`;
  };

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
      <SheetContent className="w-[400px] overflow-y-auto px-0 sm:w-[540px]">
        <div className="pt-4">
          <div className="px-4">{renderControlSidebar()}</div>
          {!isNewChat && (
            <div className="mt-6">
              <ChatMembers data={chatMembers} isChatHost={isChatHost} />
            </div>
          )}
        </div>
      </SheetContent>
      <div className="size-0 overflow-x-hidden transition-[width] lg:h-auto lg:max-h-[calc(100vh_-_65px)] lg:w-[450px] lg:border-x">
        {isNewChat ? (
          renderControlSidebar()
        ) : (
          <ResizablePanelGroup direction="vertical" onLayout={onLayout}>
            <ResizablePanel defaultSize={defaultMemberSidebarLayout[0]}>
              <div className="h-full overflow-y-auto">
                {renderControlSidebar()}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={defaultMemberSidebarLayout[1]}
              minSize={MIN_CHAT_MEMBER_SIDEBAR_SIZE}
              maxSize={MAX_CHAT_MEMBER_SIDEBAR_SIZE}
            >
              <ChatMembers data={chatMembers} isChatHost={isChatHost} />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </FormProvider>
  );
});
