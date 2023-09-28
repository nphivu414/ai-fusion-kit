import React from 'react'
import { PresetSelector } from './control-side-bar/PresetSelector'
import { aiCharacters } from './control-side-bar/data/presets'
import { Heading2 } from '@/components/ui/typography'
import { SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Settings } from 'lucide-react'
import { PresetSave } from './control-side-bar/PresetSave'
import { UseChatHelpers } from 'ai/react'

type HeaderProps = Pick<UseChatHelpers, 'append' | 'setMessages'>

export const Header = ({ append, setMessages }: HeaderProps) => {
  return (
    <div className="flex flex-col items-start justify-between space-y-4 p-4 sm:flex-row sm:items-center sm:space-y-0 lg:h-16">
      <Heading2 className='pb-0'>GPT AI Assistant</Heading2>
      <div className="ml-auto flex w-full space-x-2 sm:w-1/2 sm:justify-end sm:pr-14">
        <PresetSave />
        <PresetSelector presets={aiCharacters} append={append} setMessages={setMessages} />
        <SheetTrigger asChild className='lg:hidden'>
          <Button variant="ghost">
            <Settings/>
          </Button>
        </SheetTrigger>
      </div>
    </div>
  )
}