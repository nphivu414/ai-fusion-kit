import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Message } from "ai";

import { getAppBySlug } from "@/lib/db/apps";
import { getChatById, getChats } from "@/lib/db/chats";
import { getMessages } from "@/lib/db/message";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { ChatPanel } from "@/components/modules/apps/chat/ChatPanel";
import { ChatParams } from "@/components/modules/apps/chat/types";

export const runtime = "edge";
export const preferredRegion = "home";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Chat with your AI assistant to generate new ideas and get inspired.",
};

export default async function ChatPage({ params }: { params: { id: string } }) {
  const chatId = params.id;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);
  const currentApp = await getAppBySlug(supabase, "/apps/chat");

  if (!currentApp || !user) {
    return <div className="pt-4">No app found</div>;
  }

  const chats = await getChats(supabase, currentApp.id);

  const dbMessages = await getMessages(supabase, chatId);

  const chatDetails = await getChatById(supabase, chatId);
  if (!chatDetails) {
    redirect("/apps/chat");
  }
  const chatParams = chatDetails?.settings as ChatParams | undefined;

  const initialChatMessages: Message[] = dbMessages?.length
    ? dbMessages.map((message) => {
        return {
          id: message.id,
          role: message.role || "system",
          content: message.content || "",
        };
      })
    : [];

  if (chatParams?.description) {
    initialChatMessages.unshift({
      id: "description",
      role: "system",
      content: chatParams.description,
    });
  }

  return (
    <ChatPanel
      chatId={chatId}
      chats={chats}
      initialMessages={initialChatMessages}
      chatParams={chatParams}
    />
  );
}
