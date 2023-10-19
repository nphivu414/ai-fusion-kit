import { cache } from 'react'
import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Chat, Database, Insert, Update } from "."
import { Logger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";

type GetChatsParams = Pick<Chat, 'appId' | 'profileId'>

export const revalidate = 3600

const log = new Logger({
  logLevel: LogLevel.debug,
  args: {
    route: '[DB] Chats',
  }
});

export const getChats = cache(async (supabase: SupabaseClient<Database>, params: GetChatsParams) => {
  log.info(`${getChats.name} called`, params);
  const { data, error, status } = await supabase
    .from('chats')
    .select('*')
    .eq('appId', params.appId)
    .eq('profileId', params.profileId)
    .order('createdAt', { ascending: false })

  if (error && status !== 406) {
    log.error(getChats.name, { error, status });
    return null
  }

  await new Promise(r => setTimeout(r, 10000));

  log.info(`${getChats.name} fetched successfully`, { data });
  return data
})

export const getChatById = async (supabase: SupabaseClient<Database>, id: string) => {
  log.info(`${getChatById.name} called`, { id });
  const { data, error, status } = await supabase
    .from('chats')
    .select('*')
    .eq('id', id)
    .single()

  if (error && status !== 406) {
    log.error(getChatById.name, { error, status });
    return null
  }

  log.info(`${getChatById.name} fetched successfully`, { data });
  return data
}

export const createNewChat = async (supabase: SupabaseClient<Database>, params: Insert<'chats'>) => {
  log.info(`${createNewChat.name} called`, params);
  const { data, error, status } = await supabase
    .from('chats')
    .insert([params])
    .select()

  if (error && status !== 406) {
    log.error(createNewChat.name, { error, status });
    return null
  }

  log.info(`${createNewChat.name} created successfully`, { data });
  return data
}

export const deleteChat = async (supabase: SupabaseClient<Database>, id: string) => {
  log.info(`${deleteChat.name} called`, { id });
  const { data, error } = await supabase
    .from('chats')
    .delete()
    .eq('id', id)

  if (error) {
    log.error(deleteChat.name, { error });
    throw new Error(error.message)
  }

  log.info(`${deleteChat.name} deleted successfully`, { data });
  return data
}

export const updateChat = async (supabase: SupabaseClient<Database>, params: Update<'chats'>) => {
  log.info(`${updateChat.name} called`, params);
  const { id, ...rest } = params

  if (!id) {
    log.error(`${updateChat.name} - Missing ID`, params);
    throw new Error('Missing ID')
  }

  const { data, error, status } = await supabase
    .from('chats')
    .update(rest)
    .eq('id', id)
    .select()

  if (error && status !== 406) {
    log.error(updateChat.name, { error, status });
    return null
  }
  
  log.info(`${updateChat.name} updated successfully`, { data });
  return data?.[0]
}
