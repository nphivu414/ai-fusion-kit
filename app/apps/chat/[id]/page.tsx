import React from "react"
import { Metadata } from "next"
import { ChatPanel } from "@/components/modules/apps/chat/ChatPanel"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { getChatById, getChats } from "@/lib/db/chats"
import { getAppBySlug } from "@/lib/db/apps"
import { getCurrentSession } from "@/lib/session"
import { Message } from "ai"
import { getMessages } from "@/lib/db/message"
import { ChatParams } from "@/components/modules/apps/chat/types"
import { unstable_cache } from "next/cache"

export const metadata: Metadata = {
  title: "Chat",
  description: "The OpenAI Playground built using the components.",
}

export default async function ChatPage({ params }: { params: { id: string } }) {
  const chatId = params.id

  const supabase = createServerComponentClient({ cookies })
  const session = await getCurrentSession(supabase)
  const currentApp = await getAppBySlug(supabase, '/apps/chat')

  if (!currentApp || !session) {
    return (
      <div className="pt-4">No app found</div>
    )
  }

  const currentProfileId = session.user.id
  const chats = await unstable_cache(
    async () => {
      const data = await getChats(supabase, {
        appId: currentApp.id,
        profileId: currentProfileId,
      })
      return data
    },
    ['chats'],
    {
      revalidate: false,
    }
  )()

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
