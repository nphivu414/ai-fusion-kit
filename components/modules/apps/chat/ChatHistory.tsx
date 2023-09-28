'use client'

import { Chat } from "@/lib/db"
import { usePathname } from "next/navigation"
import { NewChatButton } from "./NewChatButton"
import React from "react"
import { ChatHistoryItem } from "./ChatHistoryItem"

type ChatHistoryProps = {
  data: Chat[] | null
  closeDrawer?: () => void
}

export const ChatHistory = ({ data, closeDrawer }: ChatHistoryProps) => {
  const pathname = usePathname()
  const chatId = pathname.split('/').pop()

  return (
    <aside className="py-4">
      <div className="sticky top-0 flex items-center justify-between bg-background">
        <p className='lg:text-md py-2 text-lg font-bold lg:font-normal lg:text-muted-foreground'>Chat history</p>
        <div className="lg: w-1/2">
          <NewChatButton closeDrawer={closeDrawer}/>
        </div>
      </div>
      <ul className="mt-2">
        {data?.length ? null : <p className='text-sm text-muted-foreground'>No data</p>}
        {data?.map((chat) => {
          return <ChatHistoryItem key={chat.id} isActive={chat.id === chatId} chat={chat} closeDrawer={closeDrawer} />
        })}
      </ul>
    </aside>
  )
}
