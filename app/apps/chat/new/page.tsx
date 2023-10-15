import React from "react"
import { Metadata } from "next"
import { ChatPanel } from "@/components/modules/apps/chat/ChatPanel"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { getAppBySlug } from "@/lib/db/apps"
import { getCurrentSession } from "@/lib/session"
import { v4 as uuidv4 } from 'uuid';
import { getChats } from "@/lib/db/chats"

export const metadata: Metadata = {
  title: "New Chat",
  description: "The OpenAI Playground built using the components.",
}

export default async function NewChatPage() {
  const chatId = uuidv4()

  const supabase = createServerComponentClient({ cookies })
  const session = await getCurrentSession(supabase)
  const currentApp = await getAppBySlug(supabase, '/apps/chat')

  if (!currentApp || !session) {
    return (
      <div className="pt-4">No app found</div>
    )
  }

  const currentProfileId = session.user.id
  const chats = await getChats(supabase, {
    appId: currentApp.id,
    profileId: currentProfileId,
  })

  return (
    <ChatPanel chatId={chatId} initialMessages={[]} chats={chats} isNewChat/>
  )
}
