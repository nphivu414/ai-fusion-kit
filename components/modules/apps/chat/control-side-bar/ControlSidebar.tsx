import React from 'react'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { MaxLengthSelector } from './MaxLengthSelector'
import { ModelSelector } from './ModelSelector'
import { TemperatureSelector } from './TemperatureSelector'
import { TopPSelector } from './TopPSelector'
import { models, types } from './data/models'
import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/Sheet'
import { SystemPromptControl } from '../SystemPromptControl'
import { UseChatHelpers } from 'ai/react'
import { FrequencyPenaltySelector } from './FrequencyPenaltySelector'
import { PresencePenaltySelector } from './PresencePenaltySelector'
import { useFormContext } from 'react-hook-form'
import { ChatParams } from '../types'
import { updateChatSettings } from './action'
import { Loader } from 'lucide-react'
import { useChatIdFromPathName } from '@/hooks/useChatIdFromPathName'
import { toast } from '@/components/ui/use-toast'

type ControlSidebarProps = Pick<UseChatHelpers, 'setMessages' | 'messages'>

export const ControlSidebar = ({ setMessages, messages }: ControlSidebarProps) => {
  const [pendingUpdateSettings, startUpdateSettings] = React.useTransition()
  const currentChatId = useChatIdFromPathName()
  const { getValues } = useFormContext<ChatParams>()

  const onSave = () => {
    if (!currentChatId) {
      return
    }

    const formValues = getValues()
    startUpdateSettings(async () => {
      try {
        updateChatSettings(currentChatId, formValues)
        toast({
          title: "Success",
          description: "Your chat settings have been saved.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save chat settings. Please try again.",
          variant: "destructive",
        })
      }
    })
  }
  
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-left">AI Assistant Customization</SheetTitle>
        <SheetDescription className="text-left">
          {`Combining these parameters allows you to fine-tune the AI's output to suit different use cases, from creative writing to generating code snippets or answering questions.`}
        </SheetDescription>
      </SheetHeader>
      <Separator className='my-4'/>
      <div>
        <SystemPromptControl setMessages={setMessages} messages={messages}/>
        <ModelSelector types={types} models={models} />
        <TemperatureSelector />
        <MaxLengthSelector />
        <TopPSelector />
        <FrequencyPenaltySelector />
        <PresencePenaltySelector />
      </div>
      <div>
        <Separator className='my-6'/>
        <SheetFooter>
          <SheetClose asChild>
            <Button className='w-full' onClick={onSave}>
              {pendingUpdateSettings ? <Loader className='animate-spin'/> : 'Save'}
            </Button>
          </SheetClose>
        </SheetFooter>
      </div>
    </>
  )
}