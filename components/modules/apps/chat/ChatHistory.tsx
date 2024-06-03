"use client";

import React from "react";

import { Chat } from "@/lib/db";
import { useChatIdFromPathName } from "@/hooks/useChatIdFromPathName";
import { Separator } from "@/components/ui/Separator";
import { Paragraph } from "@/components/ui/typography";

import { ChatHistoryItem } from "./ChatHistoryItem";
import { NewChatButton } from "./NewChatButton";

type ChatHistoryProps = {
  data: Chat[] | null;
  closeDrawer?: () => void;
};

export const ChatHistory = ({ data, closeDrawer }: ChatHistoryProps) => {
  const chatId = useChatIdFromPathName();

  return (
    <aside className="pb-4">
      <div className="sticky top-0 flex h-16 items-center justify-between bg-background lg:px-4">
        <p className="lg:text-md text-lg font-bold lg:font-normal lg:text-muted-foreground">
          Chat history
        </p>
        <div>
          <NewChatButton closeDrawer={closeDrawer} />
        </div>
      </div>
      <Separator className="sticky top-16" />
      <ul className="mt-2 lg:px-2">
        {data?.length ? null : (
          <Paragraph className="text-center text-sm text-muted-foreground">
            No chats found
          </Paragraph>
        )}
        {data?.map((chat) => {
          return (
            <ChatHistoryItem
              key={chat.id}
              isActive={chat.id === chatId}
              chat={chat}
              closeDrawer={closeDrawer}
            />
          );
        })}
      </ul>
    </aside>
  );
};
