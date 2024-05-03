"use server";

import { cookies } from "next/headers";

import { createNewChatMember } from "@/lib/db/chat-members";
import { getProfileByUsername } from "@/lib/db/profile";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

export const addNewMember = async (username: string, chatId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);

  if (!user) {
    throw new Error("You must be logged in to create a chat");
  }

  const profile = await getProfileByUsername(supabase, username);

  if (!profile) {
    throw new Error("Profile not found");
  }

  const newMember = await createNewChatMember(supabase, {
    chat_id: chatId,
    member_id: profile.id,
  });

  return newMember;
};
