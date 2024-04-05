import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import { getAppBySlug } from "@/lib/db/apps";
import { getChats } from "@/lib/db/chats";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { ChatPanel } from "@/components/modules/apps/chat/ChatPanel";

export const metadata: Metadata = {
  title: "Create a New Chat",
};

export default async function NewChatPage() {
  const chatId = uuidv4();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);
  const currentApp = await getAppBySlug(supabase, "/apps/chat");

  if (!currentApp || !user) {
    return <div className="pt-4">No app found</div>;
  }

  const chats = await getChats(supabase, currentApp.id);

  return (
    <ChatPanel chatId={chatId} initialMessages={[]} chats={chats} isNewChat />
  );
}
