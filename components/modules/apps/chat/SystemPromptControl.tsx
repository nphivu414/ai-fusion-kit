import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { Message, UseChatHelpers } from 'ai/react';
import { Label } from '@/components/ui/Label';
import { Subtle } from '@/components/ui/typography';
import { useFormContext } from 'react-hook-form';
import { ChatParams } from './types';

type SystemPromptControlProps = Pick<UseChatHelpers, 'setMessages' | 'messages'>

export const SystemPromptControl = ({ setMessages, messages }: SystemPromptControlProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const { getValues, setValue } = useFormContext<ChatParams>()
  const formValues = getValues()
  const { description } = formValues
  const [systemPromptInputValue, setSystemPromptInputValue] = React.useState<string | undefined>(description)


  const handlePopoverOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (description !== systemPromptInputValue) {
        setSystemPromptInputValue(description)
      }
    }

    setIsPopoverOpen(isOpen)
  }

  const handleSystemPromptInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPromptInputValue(e.target.value)
  }

  const handleSave = () => {
    if (!systemPromptInputValue) {
      return
    }

    const systemMessage: Message = {
      role: 'system',
      content: systemPromptInputValue,
      id: 'system-prompt',
    }

    setMessages([
      systemMessage,
      ...messages
    ])
    setValue('description', systemPromptInputValue)

    setIsPopoverOpen(false)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
      <div>
        <div className='flex items-center justify-between'>
          <Label>Description</Label>
          <PopoverTrigger asChild>
            <Button size="sm" variant="ghost">Edit</Button>
          </PopoverTrigger>
        </div>
        <Subtle className='mb-4 mt-2'>
          {description}
        </Subtle>
      </div>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Set system prompt</h4>
            <p className="text-sm text-muted-foreground">
              {`Set a custom system prompt to be prepended to the user's input. This is useful for giving the AI some context about the conversation.`}
            </p>
          </div>
          <div>
            <TextArea minRows={2} placeholder='Your custom prompt' value={systemPromptInputValue} onChange={handleSystemPromptInputChange}/>
            <Button size="sm" className='mt-4 w-full' onClick={handleSave}>
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}