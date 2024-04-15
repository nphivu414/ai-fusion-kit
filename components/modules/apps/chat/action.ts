"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TablesUpdate } from "@/lib/db";
import { getAppBySlug } from "@/lib/db/apps";
import {
  createNewChat as createNewChatDb,
  deleteChat as deleteChatDb,
  updateChat as updateChatDb,
} from "@/lib/db/chats";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

export const createNewChat = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);
  const currentApp = await getAppBySlug(supabase, "/apps/chat");

  if (!currentApp || !user) {
    throw new Error("You must be logged in to create a chat");
  }

  const newChats = await createNewChatDb(supabase, {
    app_id: currentApp.id,
    name: "(New Chat)",
  });

  if (newChats) {
    redirect(`/apps/chat/${newChats[0].id}`);
  }
};

export const deleteChat = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    await deleteChatDb(supabase, id);
    revalidatePath(`/apps`, "layout");
  } catch (error) {
    throw new Error("Failed to delete chat");
  }
};

export const updateChat = async (params: TablesUpdate<"chats">) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { id, ...rest } = params;
  if (!id) {
    throw new Error("Missing ID");
  }

  try {
    await updateChatDb(supabase, {
      id,
      ...rest,
    });
    revalidatePath(`/apps`, "layout");
  } catch (error) {
    throw new Error("Failed to update chat");
  }
};

export const revalidateChatLayout = async () => {
  revalidatePath("/apps", "layout");
};
