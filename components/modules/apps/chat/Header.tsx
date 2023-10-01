import React from 'react'
import { Heading2 } from '@/components/ui/typography'

export const Header = () => {
  return (
    <div className="flex flex-col items-start justify-between space-y-4 p-4 sm:flex-row sm:items-center sm:space-y-0 lg:h-16">
      <Heading2 className='pb-0'>GPT AI Assistant</Heading2>
    </div>
  )
}