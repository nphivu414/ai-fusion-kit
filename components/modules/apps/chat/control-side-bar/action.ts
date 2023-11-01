'use server'

import { Chat, Update } from "@/lib/db"
import { getAppBySlug } from "@/lib/db/apps"
import { updateChat } from "@/lib/db/chats"
import { getCurrentSession } from "@/lib/session"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const updateChatSettings = async (id: Chat['id'], params: Update<'chats'>['settings']) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
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