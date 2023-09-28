import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Message, Database } from "."
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

export type CreateNewMessageParams = Pick<Message, 'chatId' | 'content' | 'profileId' | 'role'> & Partial<Pick<Message, 'id'>>
type GetMessagesParams = Pick<Message, 'chatId' | 'profileId'>
const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: 'lib/db/message.ts',
  }
});

export const getMessages = async (supabase: SupabaseClient<Database>, params: GetMessagesParams) => {
  const { data, error, status } = await supabase
    .from('messages')
    .select('*')
    .eq('chatId', params.chatId)
    .eq('profileId', params.profileId)

  if (error && status !== 406) {
    return null
  }

  return data
}

export const getMessageById = async (supabase: SupabaseClient<Database>, id: Message['id']) => {
  const { data, error, status } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error && status !== 406) {
    return null
  }

  return data
}

export const createNewMessage = async (supabase: SupabaseClient<Database>, params: CreateNewMessageParams) => {
  const { data, error, status } = await supabase
    .from('messages')
    .insert([params])
    .select()

  log.debug('createNewMessage', { data });
  log.debug('createNewMessage', { error });
  log.debug('createNewMessage', { status });
  if (error && status !== 406) {
    return null
  }

  return data?.[0] || null
}

export const deleteMessagesFrom = async (supabase: SupabaseClient<Database>, chatId: Message['chatId'], profileId: Message['profileId'], from: string) => {
  await supabase.from('messages').delete().eq('chatId', chatId).eq('profileId', profileId).gt('createdAt', from)
}