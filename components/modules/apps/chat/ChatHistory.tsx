'use client'

import { Chat } from "@/lib/db"
import { usePathname } from "next/navigation"
import { NewChatButton } from "./NewChatButton"
import React from "react"
import { ChatHistoryItem } from "./ChatHistoryItem"
import { Separator } from "@/components/ui/Separator"

type ChatHistoryProps = {
  data: Chat[] | null
  closeDrawer?: () => void
}

export const ChatHistory = ({ data, closeDrawer }: ChatHistoryProps) => {
  const pathname = usePathname()
  const chatId = pathname.split('/').pop()

  return (
    <aside className="pb-4">
      <div className="sticky top-0 flex h-16 items-center justify-between bg-background lg:px-4">
        <p className='lg:text-md text-lg font-bold lg:font-normal lg:text-muted-foreground'>Chat history</p>
        <div>
          <NewChatButton closeDrawer={closeDrawer}/>
        </div>
      </div>
      <Separator className="sticky top-16"/>
      <ul className="mt-2 lg:px-2">
        {data?.length ? null : <p className='text-sm text-muted-foreground'>No data</p>}
        {data?.map((chat) => {
          return <ChatHistoryItem key={chat.id} isActive={chat.id === chatId} chat={chat} closeDrawer={closeDrawer} />
        })}
      </ul>
    </aside>
  )
}
