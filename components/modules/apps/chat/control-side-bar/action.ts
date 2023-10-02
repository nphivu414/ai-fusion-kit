'use server'

import { Chat, Database, Update } from "@/lib/db"
import { getAppBySlug } from "@/lib/db/apps"
import { updateChat } from "@/lib/db/chats"
import { getCurrentSession } from "@/lib/session"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const updateChatSettings = async (id: Chat['id'], params: Update<'chats'>['settings']) => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const session = await getCurrentSession(supabase)
  const currentApp = await getAppBySlug(supabase, '/apps/chat')

  if (!currentApp || !session) {
    throw new Error("You must be logged in to create a chat")
  }

  const currentProfileId = session.user.id

  try {
    await updateChat(supabase, {
      id: id,
      settings: params,
      profileId: currentProfileId,
      appId: currentApp.id,
    })
  } catch (error) {
    throw new Error('Failed to save chat settings')
  }
}