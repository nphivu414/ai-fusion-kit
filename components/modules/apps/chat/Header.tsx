import React from 'react'
import { Heading2 } from '@/components/ui/typography'

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between space-y-0 p-4 lg:h-16">
      <Heading2 className='pb-0'>GPT AI Assistant</Heading2>
    </div>
  )
}