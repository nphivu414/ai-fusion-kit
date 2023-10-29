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
      <div className={cn('hidden w-20 lg:group-hover:block', {
        'block': isActive
      })}>
        <div className={cn('grid grid-cols-2 ', {
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
      <div className={cn('group h-10 rounded-lg px-2 transition-colors hover:bg-accent', isActive ? "bg-accent" : "bg-background")}>
        <div className='flex h-full max-w-full flex-1 items-center'>
          <div className='flex h-full w-full justify-between'>
            <Link href={`/apps/chat/${chat.id}`} onClick={closeDrawer} className={cn('flex h-full w-[90%] items-center px-2 lg:group-hover:w-[65%]', {
              'w-[65%]': isActive
            })}>
              <div className='mr-1 w-4'>
                <MessageCircle size={16}/>
              </div>
              <p className='truncate text-sm text-muted-foreground'>{chat.name}</p>
            </Link>
            {renderActionButtons()}
          </div>
        </div>
      </div>
    </li>
  )
}