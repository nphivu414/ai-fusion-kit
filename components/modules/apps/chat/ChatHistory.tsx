"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Chat } from "@/lib/db";
import { Separator } from "@/components/ui/Separator";

import { ChatHistoryItem } from "./ChatHistoryItem";
import { NewChatButton } from "./NewChatButton";

type ChatHistoryProps = {
  data: Chat[] | null;
  closeDrawer?: () => void;
};

export const ChatHistory = ({ data, closeDrawer }: ChatHistoryProps) => {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop();

  return (
    <aside className="max-h-full overflow-auto pb-4">
      <div className="sticky top-0 flex h-16 items-center justify-between bg-card lg:px-4">
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
          <p className="text-sm text-muted-foreground">No data</p>
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
