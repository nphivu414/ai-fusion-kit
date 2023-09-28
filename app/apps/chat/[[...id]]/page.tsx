import React from "react"
import { Metadata } from "next"
import { ChatPanel } from "@/components/modules/apps/chat/ChatPanel"
import { Sheet } from "@/components/ui/Sheet"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { createNewChat, getChats } from "@/lib/db/chats"
import { getAppBySlug } from "@/lib/db/apps"
import { getCurrentSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Message } from "ai"
import { getMessages } from "@/lib/db/message"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default async function ChatPage({ params }: { params: { id: string[] } }) {
  const chatId = params.id?.[0]

  const supabase = createServerComponentClient({ cookies })
  const session = await getCurrentSession(supabase)
  const currentApp = await getAppBySlug(supabase, '/apps/chat')

  if (!currentApp || !session) {
    return (
      <div className="pt-4">No app found</div>
    )
  }

  const currentProfileId = session.user.id

  if(!chatId) {
    const chats = await getChats(supabase, {
      appId: currentApp.id,
      profileId: currentProfileId,
    })

    if (chats?.length) {
      return redirect(`/apps/chat/${chats[0].id}`)
    }

    const newChats = await createNewChat(supabase, {
      appId: currentApp.id,
      name: '(New Chat)',
      profileId: currentProfileId,
    })
    if (newChats) {
      return redirect(`/apps/chat/${newChats[0].id}`)
    }
  }

  const dbMessages = await getMessages(supabase, {
    chatId,
    profileId: currentProfileId,
  })

  const initialChatMessages: Message[] = dbMessages?.length ? dbMessages.map((message) => {
    return {
      id: message.id,
      role: message.role || 'system',
      content: message.content || '',
    }
  }) : []
  
  return (
    <Sheet>
      <ChatPanel chatId={chatId} initialMessages={initialChatMessages}/>
    </Sheet>
  )
}
