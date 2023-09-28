import { Chat } from '@/lib/db';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { DeleteChatAction } from './DeleteChatAction';
import { EditChatAction } from './EditChatAction';

type ChatHistoryItemProps = {
  chat: Chat
  isActive: boolean
  closeDrawer?: () => void
}

export const ChatHistoryItem = ({ chat, isActive, closeDrawer }: ChatHistoryItemProps) => {
  const renderActionButtons = () => {
    return (
      <div className={cn('hidden lg:block', {
        'block': isActive
      })}>
        <div className={cn('grid grid-cols-2 lg:invisible lg:group-hover:visible', {
          'lg:visible': isActive
        })}>
          <EditChatAction chat={chat}/>
          <DeleteChatAction chat={chat} />
        </div>
      </div>
    )
  }

  return (
    <li className='w-full pb-1'>
      <div className={cn('group flex h-10 flex-row items-center justify-between rounded-lg px-2 hover:bg-muted', isActive ? "bg-muted" : "bg-background")}>
        <Link className='flex max-w-full flex-1 items-center' href={`/apps/chat/${chat.id}`} onClick={closeDrawer}>
          <MessageCircle size={16}/>
          <div className='flex flex-col px-2'>
            <p className='truncate text-sm text-muted-foreground'>{chat.name}</p>
          </div>
        </Link>
        {renderActionButtons()}
      </div>
    </li>
  )
}