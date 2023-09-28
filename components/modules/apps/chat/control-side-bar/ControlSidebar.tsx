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

type ControlSidebarProps = Pick<UseChatHelpers, 'append' | 'setMessages'>

export const ControlSidebar = ({ append, setMessages }: ControlSidebarProps) => {
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-left">AI Assistant Customization</SheetTitle>
        <SheetDescription className="text-left">
          Combining these parameters allows you to fine-tune the AI's output to suit different use cases, from creative writing to generating code snippets or answering questions.
        </SheetDescription>
      </SheetHeader>
      <Separator className='my-4'/>
      <div>
        <SystemPromptControl append={append} setMessages={setMessages}/>
        <ModelSelector types={types} models={models} />
        <TemperatureSelector />
        <MaxLengthSelector />
        <TopPSelector />
        <FrequencyPenaltySelector />
        <PresencePenaltySelector />
        {/* <div className='h-[1000px]'/> */}
      </div>
      <div className='lg:hidden'>
        <Separator className='my-6'/>
        <SheetFooter>
          <SheetClose asChild>
            <Button className='w-full'>Done</Button>
          </SheetClose>
        </SheetFooter>
      </div>
    </>
  )
}