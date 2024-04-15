import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

import { Chat, Database, Message } from ".";

export type CreateNewMessageParams = Pick<
  Message,
  "chat_id" | "content" | "role"
> &
  Partial<Pick<Message, "id">>;
const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: "[DB] Messages",
  },
});

export const getMessages = async (
  supabase: SupabaseClient<Database>,
  chatId: Chat["id"]
) => {
  log.info(`${getMessages.name} called`, { chatId });
  const { data, error, status } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error && status !== 406) {
    log.error(getMessages.name, { chatId, error, status });
    return null;
  }

  log.info(`${getMessages.name} fetched successfully`, { chatId, data });
  return data;
};

export const getMessageById = async (
  supabase: SupabaseClient<Database>,
  id: Message["id"]
) => {
  log.info(`${getMessageById.name} called`, { params: { id } });
  const { data, error, status } = await supabase
    .from("messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error && status !== 406) {
    log.error(getMessageById.name, { params: { id }, error, status });
    return null;
  }

  log.info(`${getMessageById.name} fetched successfully`, { id, data });
  return data;
};

export const createNewMessage = async (
  supabase: SupabaseClient<Database>,
  params: CreateNewMessageParams
) => {
  log.info(`${createNewMessage.name} called`, params);
  const { data, error, status } = await supabase
    .from("messages")
    .insert([params])
    .select();

  if (error && status !== 406) {
    log.error(createNewMessage.name, { params, error, status });
    return null;
  }

  log.info(`${createNewMessage.name} created successfully`, { params, data });
  return data?.[0] || null;
};

export const deleteMessagesFrom = async (
  supabase: SupabaseClient<Database>,
  chatId: NonNullable<Message["chat_id"]>,
  from: string
) => {
  log.info(`${deleteMessagesFrom.name} called`, {
    params: { chatId, from },
  });
  const { data, error } = await supabase
    .from("messages")
    .delete()
    .eq("chat_id", chatId)
    .gt("created_at", from);

  if (error) {
    log.error(deleteMessagesFrom.name, { error });
  }

  log.info(`${deleteMessagesFrom.name} deleted successfully`, { chatId });
  return data;
};
