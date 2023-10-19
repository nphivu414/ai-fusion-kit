'use client'

import React from 'react'
import { Message, useChat } from 'ai/react'
import { zodResolver } from '@hookform/resolvers/zod';

import { ChatScrollAnchor } from '@/components/ui/common/ChatScrollAnchor'
import { Button } from '@/components/ui/Button'
import { SendHorizonal, Settings } from 'lucide-react'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'
import { toast } from '@/components/ui/use-toast'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet"
import { ControlSidebar } from './control-side-bar'
import { FormProvider, useForm } from 'react-hook-form';
import { ChatInput, ChatList } from '@/components/ui/chat'
import { ChatParams } from './types'
import { ChatParamSchema } from './schema';
import { defaultSystemPrompt } from './control-side-bar/data/models';
import { Header } from './Header';
import { Separator } from '@/components/ui/Separator';
import { buildChatRequestParams } from './utils';
import { Chat, Message as SupabaseMessage } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { revalidateChatLayout } from './action';
import { ChatHistoryDrawer } from './ChatHistoryDrawer';

const defaultValues: ChatParams = {
  description: defaultSystemPrompt,
  model: 'gpt-3.5-turbo',
  temperature: [1],
  topP: [0.5],
  maxTokens: [250],
  frequencyPenalty: [0],
  presencePenalty: [0],
}

type ChatPanelProps = {
  chatId: Chat['id']
  initialMessages: Message[]
  chats: Chat[] | null
  chatParams?: ChatParams
  isNewChat?: boolean
}

export const ChatPanel = ({ chatId, chats, initialMessages, chatParams, isNewChat }: ChatPanelProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [sidebarSheetOpen, setSidebarSheetOpen] = React.useState(false);
  const { formRef, onKeyDown } = useEnterSubmit()
  const router = useRouter()

  const { messages, input, setInput, handleInputChange, isLoading, stop, reload, error, setMessages, append } = useChat({
    id: chatId,
    api: '/api/chat',
    initialMessages,
    sendExtraMessageFields: true,
    onFinish: async () => {
      if (isNewChat) {
        await revalidateChatLayout()
        router.replace(`/apps/chat/${chatId}`)
      }
    }
  })

  const formReturn = useForm<ChatParams>({
    defaultValues: chatParams || defaultValues,
    mode: 'onChange',
    resolver: zodResolver(ChatParamSchema),
  });

  const getChatRequestParams = () => {
    const formValues = formReturn.getValues()
    return buildChatRequestParams(formValues)
  }

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "AI Assistant is not available at the moment. Please try again later.",
        variant: "destructive",
      })
    }
  }, [error])

  React.useEffect(() => {
    if (!messages.length) {
      return
    }
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
    })
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages.length])

  React.useEffect(() => {
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
    })
    window.scrollTo({ top: document.body.scrollHeight });
  }, [])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e)
  }

  const handleReloadMessages = (id: SupabaseMessage['id']) => {
    reload({
      options: {
        body: {
          ...getChatRequestParams(),
          chatId,
          isRegenerate: true,
          regenerateMessageId: id
        }
      }
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input || isLoading) {
      return
    }

    append({
      content: input,
      role: 'user',
      id: uuidv4(),
    }, {
      options: {
        body: {
          ...getChatRequestParams(),
          chatId,
          isNewChat
        }
      }
    })
    setInput('')
  }

  const closeSidebarSheet = () => {
    setSidebarSheetOpen(false)
  }

  const renderControlSidebar = () => {
    return <ControlSidebar setMessages={setMessages} messages={messages} closeSidebarSheet={closeSidebarSheet} isNewChat={isNewChat}/>
  }
  
  return (
    <Sheet open={sidebarSheetOpen} onOpenChange={setSidebarSheetOpen}>
      <div className='flex flex-1 flex-col'>
        <div className='flex flex-1'>
          <div className='flex w-full flex-col rounded-lg pb-4 lg:bg-background'>
            <div className='mx-auto flex w-full flex-1 flex-col'>
              <Header />
              <Separator/>
              <div ref={scrollAreaRef} className='mx-auto flex w-full max-w-screen-2xl grow basis-0 flex-col overflow-visible px-4 pb-[110px] lg:overflow-y-auto lg:pb-0'>
                <ChatList data={messages} isLoading={isLoading} stop={stop} reload={handleReloadMessages}/>
                <ChatScrollAnchor trackVisibility={isLoading} parentElement={scrollAreaRef?.current}/>
              </div>
              <div className='fixed bottom-0 left-0 w-full bg-background p-4 lg:relative lg:mt-2 lg:bg-transparent lg:py-0'>
                <form onSubmit={onSubmit} className='relative' ref={formRef}>
                  <ChatInput value={input} onKeyDown={onKeyDown} onChange={handleOnChange} />
                  <div className='absolute bottom-0 left-0 flex w-1/2 px-2 pb-2 lg:hidden'>
                    <ChatHistoryDrawer data={chats}/>
                  </div>
                  <div className='absolute bottom-0 left-12 flex w-1/2 justify-start px-2 pb-2 lg:hidden'>
                    <SheetTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <Settings />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className='absolute bottom-0 right-0 flex w-1/2 justify-end px-2 pb-2'>
                    <Button size="sm" type='submit' disabled={isLoading}>
                      Send
                      <SendHorizonal size={14} className='ml-1'/>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <FormProvider {...formReturn}>
            <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
              <div className="pt-4">
                {renderControlSidebar()}
              </div>
            </SheetContent>
            <div className="h-0 w-0 overflow-x-hidden transition-[width] lg:h-auto lg:max-h-[calc(100vh_-_65px)] lg:w-[450px] lg:border-x">
              {renderControlSidebar()}
            </div>
          </FormProvider>
        </div>
      </div>
    </Sheet>
  )
}