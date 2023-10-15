'use client'

import { Button } from '@/components/ui/Button';
import { Chat } from '@/lib/db';
import { cn } from '@/lib/utils';
import { History } from 'lucide-react';
import React from 'react';
import { Drawer } from 'vaul';
import { ChatHistory } from './ChatHistory';

type ChatHistoryDrawerProps = {
  data: Chat[] | null
}

export const ChatHistoryDrawer = ({ data }: ChatHistoryDrawerProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const onHistoryButtonClick = () => {
    setDrawerOpen(true)
  }

  const closeDrawer = React.useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Button variant="ghost" size="sm" onClick={onHistoryButtonClick}>
        <History/>
      </Button>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 backdrop-blur-lg" />
        <Drawer.Content className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-full max-h-[80%] flex-col rounded-t-xl border bg-background")}>
          <div className="mx-auto my-4 h-1.5 w-12 shrink-0 rounded-full bg-border" />
          <div className="relative flex-1 overflow-y-auto px-4 pb-4">
            <ChatHistory data={data} closeDrawer={closeDrawer}/>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}