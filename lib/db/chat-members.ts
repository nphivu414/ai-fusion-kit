import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

import { ChatMember, ChatMemberProfile, Database, TablesInsert } from ".";

const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: "[DB] Chat Members",
  },
});

export const createNewChatMember = async (
  supabase: SupabaseClient<Database>,
  params: TablesInsert<"chat_members">
) => {
  log.info(`${createNewChatMember.name} called`, params);

  const { data, error } = await supabase
    .from("chat_members")
    .insert(params)
    .select();

  if (error) {
    log.error(createNewChatMember.name, { error });
    return null;
  }

  log.info(`${createNewChatMember.name} created successfully`, { data });
  return data;
};

export const getChatMembers = async (
  supabase: SupabaseClient<Database>,
  chatId: ChatMember["chat_id"]
) => {
  log.info(`${getChatMembers.name} called`, { chatId });
  const { data, error, status } = await supabase
    .from("chat_members")
    .select(`id,profiles (*)`)
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error && status !== 406) {
    log.error(getChatMembers.name, { error, status });
    return null;
  }

  log.info(`${getChatMembers.name} fetched successfully`, { data });
  return data satisfies ChatMemberProfile[] | null;
};

export const deleteChatMember = async (
  supabase: SupabaseClient<Database>,
  id: ChatMember["id"]
) => {
  log.info(`${deleteChatMember.name} called`, { id });

  const { data, error } = await supabase
    .from("chat_members")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    log.error(deleteChatMember.name, { error });
    throw error;
  }

  log.info(`${deleteChatMember.name} deleted successfully`, { data });
  return data;
};
