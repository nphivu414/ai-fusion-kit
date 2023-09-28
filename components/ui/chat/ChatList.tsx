import { Message } from 'ai/react';
import React from 'react';
import { ChatBubble } from './ChatBubble';
import { Heading5 } from '@/components/ui/typography';
import GPTAvatar from '@/public/chat-gpt.jpeg';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { toast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getCurrentProfile } from '@/lib/db/profile';
import { Profile, Message as SupabaseMessage } from '@/lib/db';

type ChatListProps = {
  data: Message[];
  isLoading: boolean;
  stop: () => void;
  reload: (id: SupabaseMessage['id']) => void;
}

export const ChatList = ({ data, isLoading, stop, reload }: ChatListProps) => {
  const supabase = createClientComponentClient()
  const [userProfile, setUserProfile] = React.useState<Profile | null>(null)

  React.useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getCurrentProfile(supabase)
      if (!profile) {
        return
      }
      setUserProfile(profile)
    }
    fetchProfile()
  }, [supabase])

  const { isCopied, copyToClipboard } = useCopyToClipboard({})

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
        data.length ? (
          <>
            {
              data.map((m, index) => {
                if (m.role === 'system' || m.id === 'change-system-prompt') {
                  return null
                }
                const name = m.role === 'assistant' ? 'AI Assistant' : userProfile?.username || 'You'
                const avatar = m.role === 'assistant' ? GPTAvatar.src : userProfile?.avatar_url || ''
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
            <div className='text-center lg:max-w-[60%]'>
              <Heading5 className='lg:text-2xl'>Unleash Your Creativity</Heading5>
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