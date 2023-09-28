"use client"

import React from 'react';
import { TextArea } from '@/components/ui/TextArea';

type ChatTextAreaProps = React.ComponentPropsWithRef<typeof TextArea>

export const ChatInput = (props: ChatTextAreaProps) => {
  return (
    <TextArea placeholder='Ask me anything' containerClassName='max-w-full' className='pb-14' minRows={2} ref={props.ref} {...props}/>
  )
}