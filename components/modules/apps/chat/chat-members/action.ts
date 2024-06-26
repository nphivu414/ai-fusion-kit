"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createNewChatMember, deleteChatMember } from "@/lib/db/chat-members";
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

  if (!newMember) {
    throw new Error("Failed to add the member to this chat");
  }

  revalidatePath(`/apps/chat/${chatId}`);

  return newMember;
};

export const deleteMember = async (memberId: string, chatId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);

  if (!user) {
    throw new Error("You must be logged in to delete a chat member");
  }

  try {
    await deleteChatMember(supabase, memberId);
    revalidatePath(`/apps/chat/${chatId}`);
  } catch (error) {
    throw new Error("Failed to remove the member from this chat");
  }

  return null;
};
