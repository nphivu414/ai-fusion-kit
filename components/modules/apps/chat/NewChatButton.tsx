'use client'

import { buttonVariants } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type NewChatButtonProps = {
  closeDrawer?: () => void
}

export const NewChatButton = ({ closeDrawer }: NewChatButtonProps) => {
  return (
    <Link href="/apps/chat" className={cn(buttonVariants({
      size: 'sm',
      variant: 'outline'
    }))}
    onClick={closeDrawer}
    >
      <Plus size={16} />
    </Link>
  )
}
