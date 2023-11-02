import { SupabaseClient } from "@supabase/supabase-js"
import { Message, Database } from "."
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";
import { unstable_cache } from "next/cache";
import { CACHE_KEYS, CACHE_TTL } from "../cache";

export type CreateNewMessageParams = Pick<Message, 'chatId' | 'content' | 'profileId' | 'role'> & Partial<Pick<Message, 'id'>>
type GetMessagesParams = Pick<Message, 'chatId' | 'profileId'>
const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: '[DB] Messages',
  }
});

export const getMessages = unstable_cache(async (supabase: SupabaseClient<Database>, params: GetMessagesParams) => {
  log.info(`${getMessages.name} called`, { params });
  const { data, error, status } = await supabase
    .from('messages')
    .select('*')
    .eq('chatId', params.chatId)
    .eq('profileId', params.profileId)
    .order('createdAt', { ascending: true })

  if (error && status !== 406) {
    log.error(getMessages.name, { params, error, status });
    return null
  }

  log.info(`${getMessages.name} fetched successfully`, { params, data });
  return data
},
[CACHE_KEYS.MESSAGES],
{
  revalidate: CACHE_TTL
})

export const getMessageById = async (supabase: SupabaseClient<Database>, id: Message['id']) => {
  log.info(`${getMessageById.name} called`, { params: { id } });
  const { data, error, status } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error && status !== 406) {
    log.error(getMessageById.name, { params: { id }, error, status });
    return null
  }

  log.info(`${getMessageById.name} fetched successfully`, { id, data });
  return data
}

export const createNewMessage = async (supabase: SupabaseClient<Database>, params: CreateNewMessageParams) => {
  log.info(`${createNewMessage.name} called`, params);
  const { data, error, status } = await supabase
    .from('messages')
    .insert([params])
    .select()

  if (error && status !== 406) {
    log.error(createNewMessage.name, { params, error, status });
    return null
  }

  log.info(`${createNewMessage.name} created successfully`, { params, data });
  return data?.[0] || null
}

export const deleteMessagesFrom = async (supabase: SupabaseClient<Database>, chatId: Message['chatId'], profileId: Message['profileId'], from: string) => {
  log.info(`${deleteMessagesFrom.name} called`, {params: { chatId, profileId, from }});
  const { data, error } = await supabase.from('messages').delete().eq('chatId', chatId).eq('profileId', profileId).gt('createdAt', from)

  if (error) {
    log.error(deleteMessagesFrom.name, { error });
  }

  log.info(`${deleteMessagesFrom.name} deleted successfully`, { chatId });
  return data
}