import React from 'react'
import { Heading2 } from '@/components/ui/typography'
import { SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Settings } from 'lucide-react'

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between space-y-0 p-4 lg:h-16">
      <Heading2 className='pb-0'>GPT AI Assistant</Heading2>
      <div className="flex justify-end space-x-2 pr-12">
        <SheetTrigger asChild className='lg:hidden'>
          <Button size="sm" variant="ghost">
            <Settings/>
          </Button>
        </SheetTrigger>
      </div>
    </div>
  )
}