"use server";

import { cookies } from "next/headers";

import { Chat, Update } from "@/lib/db";
import { getAppBySlug } from "@/lib/db/apps";
import { updateChat } from "@/lib/db/chats";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

export const updateChatSettings = async (
  id: Chat["id"],
  params: Update<"chats">["settings"]
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);
  const currentApp = await getAppBySlug(supabase, "/apps/chat");

  if (!currentApp || !user) {
    throw new Error("You must be logged in to create a chat");
  }

  const currentProfileId = user.id;

  try {
    await updateChat(supabase, {
      id: id,
      settings: params,
      profileId: currentProfileId,
      appId: currentApp.id,
    });
  } catch (error) {
    throw new Error("Failed to save chat settings");
  }
};
