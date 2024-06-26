"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { TablesUpdate } from "@/lib/db";
import {
  deleteChat as deleteChatDb,
  updateChat as updateChatDb,
} from "@/lib/db/chats";
import { createClient } from "@/lib/supabase/server";

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
