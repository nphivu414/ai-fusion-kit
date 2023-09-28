'use client'

import { useAtBottom } from '@/hooks/useAtBottom'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'


interface ChatScrollAnchorProps {
  trackVisibility?: boolean
  parentElement: HTMLElement | null
}

export function ChatScrollAnchor({ trackVisibility, parentElement }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom(0, parentElement ?? undefined)
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    // rootMargin: '0px 0px -150px 0px'
  })

  React.useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start'
      })
    }
  }, [inView, entry, isAtBottom, trackVisibility])

  return <div ref={ref} className="h-px w-full" />
}