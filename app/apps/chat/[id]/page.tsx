import React from "react"
import { cookies } from "next/headers"
import { Metadata } from "next"
import { ChatPanel } from "@/components/modules/apps/chat/ChatPanel"
import { createClient } from "@/lib/supabase/server"
import { getChatById, getChats } from "@/lib/db/chats"
import { getAppBySlug } from "@/lib/db/apps"
import { getCurrentSession } from "@/lib/session"
import { Message } from "ai"
import { getMessages } from "@/lib/db/message"
import { ChatParams } from "@/components/modules/apps/chat/types"

export const runtime = "edge"
export const preferredRegion = "home"

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with your AI assistant to generate new ideas and get inspired.",
}

export default async function ChatPage({ params }: { params: { id: string } }) {
  const chatId = params.id

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
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

  const dbMessages = await getMessages(supabase, {
    chatId,
    profileId: currentProfileId,
  })

  const chatDetails = await getChatById(supabase, chatId)
  const chatParams = chatDetails?.settings as ChatParams | undefined

  const initialChatMessages: Message[] = dbMessages?.length ? dbMessages.map((message) => {
    return {
      id: message.id,
      role: message.role || 'system',
      content: message.content || '',
    }
  }) : []

  if (chatParams?.description) {
    initialChatMessages.unshift({
      id: 'description',
      role: 'system',
      content: chatParams.description,
    })
  }
  
  return (
    <ChatPanel chatId={chatId} chats={chats} initialMessages={initialChatMessages} chatParams={chatParams}/>
  )
}
