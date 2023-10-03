import { Message } from 'ai/react';
import React from 'react';
import { ChatBubble } from './ChatBubble';
import { Heading5 } from '@/components/ui/typography';
import GPTAvatar from '@/public/chat-gpt.jpeg';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { toast } from '@/components/ui/use-toast';
import { Message as SupabaseMessage } from '@/lib/db';
import { useProfileStore } from '@/lib/stores/profile';

type ChatListProps = {
  data: Message[];
  isLoading: boolean;
  stop: () => void;
  reload: (id: SupabaseMessage['id']) => void;
}

export const ChatList = ({ data, isLoading, stop, reload }: ChatListProps) => {
  const profile = useProfileStore(state => state.profile)
  const { isCopied, copyToClipboard } = useCopyToClipboard({})
  const hasConversation = data.filter(message => message.role !== "system").length > 0

  React.useEffect(() => {
    if (isCopied) {
      toast({
        description: 'Copied to clipboard',
      })
    }
  }, [isCopied])

  return (
    <>
      {
        hasConversation ? (
          <>
            {
              data.map((m, index) => {
                if (m.role === 'system') {
                  return null
                }
                const name = m.role === 'assistant' ? 'AI Assistant' : profile?.username || 'You'
                const avatar = m.role === 'assistant' ? GPTAvatar.src : profile?.avatar_url || ''
                const direction = m.role === 'assistant' ? 'start' : 'end'
                const isLast = index === data.length - 1
                return (
                  <ChatBubble 
                    id={m.id}
                    prevId={data[index - 1]?.role === 'user' ? data[index - 1].id : undefined}
                    key={index}
                    name={name}
                    content={m.content}
                    avatar={avatar}
                    direction={direction}
                    isLoading={isLoading}
                    isLast={isLast}
                    onCopy={copyToClipboard}
                    onRegenerate={reload}
                    onStopGenerating={stop}
                  />
                )
              })
            }
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center'>
            <div className='text-center lg:max-w-[65%]'>
              <Heading5 className='lg:text-3xl'>Unleash Your Creativity</Heading5>
              <p className='mt-2 text-sm text-muted-foreground'>
                  Chat with your AI assistant to generate new ideas and get inspired.
              </p>
            </div>
          </div>
        )
      }
    </>
  )
}