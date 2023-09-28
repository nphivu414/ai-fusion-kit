import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Chat, Database, Insert, Update } from "."

type GetChatsParams = Pick<Chat, 'appId' | 'profileId'>

export const getChats = async (supabase: SupabaseClient<Database>, params: GetChatsParams) => {
  const { data, error, status } = await supabase
    .from('chats')
    .select('*')
    .eq('appId', params.appId)
    .eq('profileId', params.profileId)
    .order('createdAt', { ascending: false })

  if (error && status !== 406) {
    return null
  }

  return data
}

export const createNewChat = async (supabase: SupabaseClient<Database>, params: Insert<'chats'>) => {
  const { data, error, status } = await supabase
    .from('chats')
    .insert([params])
    .select()

  if (error && status !== 406) {
    return null
  }

  return data
}

export const deleteChat = async (supabase: SupabaseClient<Database>, id: string) => {
  const { data, error } = await supabase
    .from('chats')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateChat = async (supabase: SupabaseClient<Database>, params: Update<'chats'>) => {
  const { id, ...rest } = params

  if (!id) {
    throw new Error('Missing ID')
  }

  const { data, error, status } = await supabase
    .from('chats')
    .update(rest)
    .eq('id', id)
    .select()

  if (error && status !== 406) {
    return null
  }
  
  return data
}
