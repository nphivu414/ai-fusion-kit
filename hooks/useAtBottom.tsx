import * as React from 'react'

export function useAtBottom(offset = 0, element?: HTMLElement) {
  const [isAtBottom, setIsAtBottom] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      let isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset
      if (element) {
        isAtBottom = element.scrollTop + element.offsetHeight >= element.scrollHeight - offset
      }
      setIsAtBottom(isAtBottom)
    }

    if (!element) {
      window.addEventListener('scroll', handleScroll)
    } else {
      element.addEventListener('scroll', handleScroll)
    }
    
    handleScroll()

    return () => {
      if (!element) {
        window.removeEventListener('scroll', handleScroll)
      }else {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [element, offset])

  return isAtBottom
}