'use client'

import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React from 'react'
import { createNewChat } from './action'
import { toast } from '@/components/ui/use-toast'

type NewChatButtonProps = {
  closeDrawer?: () => void
}

export const NewChatButton = ({ closeDrawer }: NewChatButtonProps) => {
  const [pendingCreateNewChat, startCreateNewChat] = React.useTransition()

  const onCreateNewChat = async () => {
    startCreateNewChat(async () => {
      try {
        await createNewChat()
        toast({
          title: "Success",
          description: "New chat created.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create new chat. Please try again.",
          variant: "destructive",
        })
      } finally {
        closeDrawer?.()
      }
    })
  }

  return (
    <Button variant="outline" size="sm" className='w-full' isLoading={pendingCreateNewChat} onClick={onCreateNewChat}>
      <Plus size={16} className='mr-2'/>
      New Chat
    </Button>
  )
}
